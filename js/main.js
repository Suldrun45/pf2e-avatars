const AVATAR_UUID='Compendium.pf2e.spells-srd.Item.ckUOoqOM7Kg7VqxB';

Hooks.once("ready", async function () {
    Hooks.on("createItem", async (item, data, userId) => {
        if (game.userId!=userId)
            return;
        if (item.type=="effect" && (item._stats.compendiumSource?.startsWith('Compendium.pf2e-avatars.avatars.') || (item.flags.core?.sourceId ?? "").startsWith('Compendium.pf2e-avatars.avatars.'))){
            const hasCharacterGallery = game.modules.some(s => s.id=='pf2e-tokens-characters' && s.active);
            const hasMythAndMagic = game.modules.some(s => s.id=='pf2e-tokens-myth-and-magic' && s.active);
            const rules= item.rules;
            const ruleImage = rules.find(f => f.key=="ActiveEffectLike" && f.path=="flags.pf2e-avatars.avatarTokenImage");
            if (ruleImage)
            {            
                if ((hasCharacterGallery && ruleImage.value.module=="character-gallery") || (hasMythAndMagic && ruleImage.value.module=="myth-and-magic")){
                    rules.push(ruleImage.value.rule);
                    await item.update({'system.rules': rules});
                }
            }
        }	
    });

    Hooks.on("createChatMessage", async (chatMessage, _info, userID) => {
        if (userID !== game.user.id) return;

        const itemUuid = chatMessage?.item?._stats?.compendiumSource;

        if (!itemUuid) return;
        if (itemUuid !== AVATAR_UUID) return;
        const spellcaster = ChatMessage.getSpeakerActor(chatMessage.speaker);
        const deityUUID = spellcaster?.deity?.sourceId;
        if (!deityUUID) return;
        const deity = await fromUuid(deityUUID);
        if (!deity) return;
        const deityName = deity.name;
        const deities = game.packs.find(p => p.collection=='pf2e-avatars.avatars');
        const avatarEffectEntry = deities.index.find(d => d.name.toLowerCase().includes('avatar of ' + deityName.toLowerCase()));
        if (!avatarEffectEntry) return;
        const avatarEffect = await fromUuid(avatarEffectEntry.uuid);
        await spellcaster.createEmbeddedDocuments("Item", [avatarEffect]);
    });
});
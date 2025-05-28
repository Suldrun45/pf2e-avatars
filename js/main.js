Hooks.on("createItem", async (item) => {
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

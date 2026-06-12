import { getDeity, getDeityByAvatar } from "./deities.js";
import { APPARITION_AVATARS, getAnimistAvatarEffect } from "./avatars.js";
import { convertItemUUIDBasedOnSystem, reverseConvertUUIDBasedOnSystem } from "./helpers.js";

export let system = "";
export let anachronismsystem = "";

const AVATAR_UUID='Compendium.pf2e.spells-srd.Item.ckUOoqOM7Kg7VqxB';
const ANIMIST_UUID='Compendium.pf2e.classes.Item.9KiqZVG9r5g8mC4V';
const AVATAR_APPARITION_UUID='Compendium.pf2e-avatars.avatars.Item.1VPvzF87B6OIvoTN';

Hooks.once("ready", async function () {
  
    system = game.system.id;
    anachronismsystem = system == "pf2e" ? "sf2e" : "pf2e";
    
    Hooks.on("createItem", async (item, data, userId) => {
        if (game.userId!=userId)
            return;
        if (item.type=="effect" && (
          item._stats.compendiumSource?.startsWith('Compendium.pf2e-avatars.avatars.') 
          || (item.flags.core?.sourceId ?? "").startsWith('Compendium.pf2e-avatars.avatars.')
          || item._stats.compendiumSource?.startsWith('Compendium.pf2e-avatars.avatars-sf2e.') 
          || (item.flags.core?.sourceId ?? "").startsWith('Compendium.pf2e-avatars.avatars-sf2e.')
        )){
            const hasCharacterGallery = game.modules.some(s => s.id=='pf2e-tokens-characters' && s.active);
            const hasMythAndMagic = game.modules.some(s => s.id=='pf2e-tokens-myth-and-magic' && s.active);
            
            const deity = getDeityByAvatar(item.sourceId);
            if ((hasCharacterGallery && deity?.image?.source == "character-gallery")  || (hasMythAndMagic && deity?.image?.source == "myth-and-magic")) {              
              const rules= item.rules;
              const tokenRule = {
                "key": "TokenImage",
                "value": deity.image.url,
                "scale": deity.image.scale,
                "ring": {
                  "subject": {
                    "texture": deity.image.dynamicurl,
                    "scale": deity.image.dynamicscale ?? deity.image.scale
                  }
                }
              };
              rules.push(tokenRule);
              await item.update({'system.rules': rules});
            }    
        }	
    });

    Hooks.on("createChatMessage", async (chatMessage, _info, userID) => {
        if (userID !== game.user.id) return;

        const itemUuid = chatMessage?.item?._stats?.compendiumSource;

        if (!itemUuid) return;
        if (convertItemUUIDBasedOnSystem(itemUuid) !== AVATAR_UUID) return;
        
        const spellcaster = ChatMessage.getSpeakerActor(chatMessage.speaker);
        if (!spellcaster) return;

        if (convertItemUUIDBasedOnSystem(spellcaster.class.sourceId) == ANIMIST_UUID) {
            const primaryVesselsData = game.dailies?.api.getAnimistVesselsData(spellcaster);
            const hasPrimary = primaryVesselsData?.primary.length;
            const choices = hasPrimary ? [] : APPARITION_AVATARS.map(apparition => ({"label": apparition.label, "value": apparition.value}));
            if (hasPrimary) {
                primaryVesselsData.primary.forEach(vessel => {
                    const vesselId = spellcaster.itemTypes.spell.find(s => s.id == vessel)?.sourceId;
                    if (vesselId) {
                        const apparition = APPARITION_AVATARS.find(f => f.vesselSpell == convertItemUUIDBasedOnSystem(vesselId));
                        if (apparition){
                            choices.push({"label": apparition.label, "value": reverseConvertUUIDBasedOnSystem(apparition.value)});
                        }
                    }
                });
            }
            const avatarEffect = getAnimistAvatarEffect(choices);
            await spellcaster.createEmbeddedDocuments("Item", [avatarEffect]);
        }
        else {
            const deityUUID = spellcaster?.deity?.sourceId;
            if (!deityUUID) return;

            const deity = getDeity(deityUUID);
            if (!deity) return;            
            const avatarEffect = await foundry.utils.fromUuid(deity.avatarUUID);
            await spellcaster.createEmbeddedDocuments("Item", [avatarEffect]);
        }
    });
});
const AVATAR_UUID='Compendium.pf2e.spells-srd.Item.ckUOoqOM7Kg7VqxB';
const ANIMIST_UUID='Compendium.pf2e.classes.Item.9KiqZVG9r5g8mC4V';
const AVATAR_APPARITION_UUID='Compendium.pf2e-avatars.avatars.Item.1VPvzF87B6OIvoTN';
const APPARITION_AVATARS=[{
    "label": "Crafter in the Vault",
    "value": "Compendium.pf2e-avatars.avatars.Item.PFGW69TY36yo5inb",
    "vesselSpell": "Compendium.pf2e.spells-srd.Item.rzcXUF5YmJYxgxEa"
  },
  {
    "label": "Custodian of Groves and Gardens",
    "value": "Compendium.pf2e-avatars.avatars.Item.7LrXVbYDHGbroiO4",
    "vesselSpell": "Compendium.pf2e.spells-srd.Item.w4M6Vqvq8k6MOFvj"
  },
  {
    "label": "Echo of Lost Moments",
    "value": "Compendium.pf2e-avatars.avatars.Item.xe65VimknQXFjnAa",
    "vesselSpell": "Compendium.pf2e.spells-srd.Item.FZMVLL7HvasjiM6D"
  },
  {
    "label": "Impostor in Hidden Places",
    "value": "Compendium.pf2e-avatars.avatars.Item.EQ9mYN7JSlUj5h2T",
    "vesselSpell": "Compendium.pf2e.spells-srd.Item.t1e3U2eluRsp2izf"
  },
  {
    "label": "Lurker in Devouring Dark",
    "value": "Compendium.pf2e-avatars.avatars.Item.ukEKOzobGGBKS9Nn",
    "vesselSpell": "Compendium.pf2e.spells-srd.Item.wTldMJx0vyBAehrI"
  },
  {
    "label": "Monarch of the Fey Courts",
    "value": "Compendium.pf2e-avatars.avatars.Item.cVFRqkoPzo6BDofl",
    "vesselSpell": "Compendium.pf2e.spells-srd.Item.SAmyaiVKTDrUNjot"
  },
  {
    "label": "Reveler in Lost Glee",
    "value": "Compendium.pf2e-avatars.avatars.Item.gucr39MJ2SOaAEIK",
    "vesselSpell": "Compendium.pf2e.spells-srd.Item.cuKVbWWNzJj1GDpZ"
  },
  {
    "label": "Shepherd of Errant Winds",
    "value": "Compendium.pf2e-avatars.avatars.Item.oMbS3Dc18cp9FXSA",
    "vesselSpell": "Compendium.pf2e.spells-srd.Item.x2Gf3lt64eoMocMd"
  },
  {
    "label": "Speaker of Sibilance",
    "value": "Compendium.pf2e-avatars.avatars.Item.MLHZkbkcjCZZsePd",
    "vesselSpell": "Compendium.pf2e.spells-srd.Item.h2DLv8TQV0Z83tQp"
  },
  {
    "label": "Stalker in Darkened Boughs",
    "value": "Compendium.pf2e-avatars.avatars.Item.gzw5qFck8lcebord",
    "vesselSpell": "Compendium.pf2e.spells-srd.Item.BhJtCTLbngvZm8EA"
  },
  {
    "label": "Steward of Stone and Fire",
    "value": "Compendium.pf2e-avatars.avatars.Item.BJsH049PhBrxjctn",
    "vesselSpell": "Compendium.pf2e.spells-srd.Item.PrlR2sLWeiuTcPF2"
  },
  {
    "label": "Vanguard of Roaring Waters",
    "value": "Compendium.pf2e-avatars.avatars.Item.OhbK4vN5zMSU6Dhs",
    "vesselSpell": "Compendium.pf2e.spells-srd.Item.ew4ToaTU3o8ahKio"
  },
  {
    "label": "Witness to Ancient Battles",
    "value": "Compendium.pf2e-avatars.avatars.Item.GNZ1THJ5qqoSOGQ7",
    "vesselSpell": "Compendium.pf2e.spells-srd.Item.X4On99Nti8gjWywG"
  }];

function getAnimistAvatarEffect(choices){
  return{
    "name": "Effect: Apparition Avatar",
    "type": "effect",
    "system": {
      "description": {
        "value": "<p></p>",
        "gm": ""
      },
      "publication": {
        "title": "PF2e Avatars",
        "authors": "",
        "license": "ORC",
        "remaster": true
      },
      "rules": [
        {
          "key": "ChoiceSet",
          "flag": "animistAvatar",
          "choices": choices
        },
        {
          "key": "GrantItem",
          "uuid": "{item|flags.system.rulesSelections.animistAvatar}",
          "onDeleteActions": {
            "grantee": "restrict"
          }
        }
      ],
      "slug": "effect-apparition-avatar",
      "level": {
        "value": 1
      },
      "duration": {
        "value": -1,
        "unit": "unlimited",
        "expiry": null,
        "sustained": false
      },
      "tokenIcon": {
        "show": true
      }
    },
    "img": "icons/magic/symbols/circled-gem-pink.webp"   
  }
}

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
        if (!spellcaster) return;

        if (spellcaster.class.sourceId==ANIMIST_UUID) {
            const primaryVesselsData = game.dailies?.api.getAnimistVesselsData(spellcaster);
            const hasPrimary = primaryVesselsData?.primary.length;
            const choices = hasPrimary ? [] : APPARITION_AVATARS.map(apparition => ({"label": apparition.label, "value": apparition.value}));
            if (hasPrimary) {
                primaryVesselsData.primary.forEach(vessel => {
                    const vesselId = spellcaster.itemTypes.spell.find(s => s.id == vessel)?.sourceId;
                    if (vesselId) {
                        const apparition = APPARITION_AVATARS.find(f => f.vesselSpell == vesselId);
                        if (apparition){
                            choices.push({"label": apparition.label, "value": apparition.value});
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
            const deity = await fromUuid(deityUUID);
            if (!deity) return;
            const deityName = deity.name;
            const deities = game.packs.find(p => p.collection=='pf2e-avatars.avatars');
            const avatarEffectEntry = deities.index.find(d => d.name.toLowerCase().includes('avatar of ' + deityName.toLowerCase()));
            if (!avatarEffectEntry) return;
            const avatarEffect = await fromUuid(avatarEffectEntry.uuid);
            await spellcaster.createEmbeddedDocuments("Item", [avatarEffect]);
        }
    });
});
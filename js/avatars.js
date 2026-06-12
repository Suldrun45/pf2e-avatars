export const APPARITION_AVATARS=[{
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

export function getAnimistAvatarEffect(choices){
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
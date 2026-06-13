export function convertItemUUID(uuid, isSF2EAnachronism) {
    if (!uuid) return null;
    let finalUUID = uuid;
    if (game.system.id === "sf2e") {
      finalUUID = finalUUID
        .replace(".avatar-abilities-sf2e.", ".avatar-abilities.")
        .replace(".avatars-sf2e.", ".avatars.")
        .replace(".pf2e-anachronism.spells.", ".pf2e.spells-srd.")
        .replace(".pf2e-anachronism.", ".pf2e.")
        .replace(".sf2e.actions.", ".pf2e.actionspf2e.")
        .replace(".sf2e.spells.", ".pf2e.spells-srd.")
        .replace(".sf2e.", (isSF2EAnachronism? ".sf2e-anachronism.": ".pf2e."));
    } 
  
    return finalUUID;
  }
export function reverseConvertUUID(uuid, fromSystem) {
    if (!uuid) return null;
    let finalUUID = uuid;
    if (game.system.id === "sf2e") {
      finalUUID = finalUUID
        .replace(".pf2e.", fromSystem ? ".pf2e." : ".pf2e-anachronism.")
        .replace(".sf2e-anachronism.", ".sf2e.")
        .replace(".avatars.", ".avatars-sf2e.")
    } 
  
    return finalUUID;
  }
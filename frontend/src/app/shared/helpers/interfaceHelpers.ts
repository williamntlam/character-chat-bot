import { RawCharacterData, CharacterData } from './../interfaces/interfaces';

export function transformCharacterData(data: RawCharacterData): CharacterData {
  return {
    characterName: data['character-name'],
    characterDescription: data['character-description'],
  };
}

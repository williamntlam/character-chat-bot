import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {
  RawCharacterData,
  CharacterData,
} from '../../shared/interfaces/interfaces';

function transformCharacterData(data: RawCharacterData): CharacterData {
  return {
    characterName: data['character-name'],
    characterDescription: data['character-description'],
  };
}

@Injectable({
  providedIn: 'root',
})
export class CharacterRegistrationService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:5000/character';

  registerCharacter = (characterData: RawCharacterData) => {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const processedCharacterValues = transformCharacterData(characterData);

    console.log(processedCharacterValues);

    return this.http.post(this.apiUrl, processedCharacterValues, { headers });
  };
}

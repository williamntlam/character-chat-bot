import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {
  RawCharacterData,
  CharacterData,
} from '../../shared/interfaces/interfaces';

import { transformCharacterData } from '../../shared/helpers/interfaceHelpers';

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

    const processedCharacterValues: CharacterData =
      transformCharacterData(characterData);

    return this.http.post(this.apiUrl, processedCharacterValues, { headers });
  };
}

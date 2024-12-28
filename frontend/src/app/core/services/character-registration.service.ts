import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface CharacterData {
  characterName: string;
  characterDescription: string;
}

@Injectable({
  providedIn: 'root',
})
export class CharacterRegistrationService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:5000/character';

  registerCharacter = (characterData: CharacterData) => {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(this.apiUrl, characterData, { headers });
  };
}

import { Component } from '@angular/core';
import { Game } from '../core/models/game.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    teams = [
        {
            name: 'Team1',
            money: 35,
            score: 123,
            users: [
                {
                    email: 'email2',
                    fullName: 'First player',
                    job: {
                        name: 'Policeman',
                        salary: 15,
                        jobTypeName: 'test',
                        salaryConfirmationType: 'NONE',
                        description: ''
                    },
                    money: 15,
                    score: 61
                }, {
                    email: 'email3',
                    fullName: 'Second player',
                    job: {
                        name: 'Policeman',
                        salary: 15,
                        jobTypeName: 'test',
                        salaryConfirmationType: 'NONE',
                        description: ''
                    },
                    money: 20,
                    score: 62
                }
            ]
        },
        {
            name: 'Team2',
            money: 20,
            score: 120,
            users: [
                {
                    email: 'email2',
                    fullName: 'Third player',
                    job: {
                        name: 'Policeman2',
                        salary: 30,
                        jobTypeName: 'test',
                        salaryConfirmationType: 'NONE',
                        description: ''
                    },
                    money: 15,
                    score: 75
                },
                {
                    email: 'email2',
                    fullName: 'Forth player',
                    job: {
                        name: 'Policeman2',
                        salary: 30,
                        jobTypeName: 'test',
                        salaryConfirmationType: 'NONE',
                        description: ''
                    },
                    money: 5,
                    score: 45
                }
            ]
        },
        {
            name: 'Team3',
            money: 120,
            score: 111,
            users: [
                {
                    email: 'email3',
                    fullName: 'Fifth player',
                    job: {
                        name: 'Policeman3',
                        salary: 45,
                        jobTypeName: 'test',
                        salaryConfirmationType: 'NONE',
                        description: ''
                    },
                    money: 120,
                    score: 111
                }
            ]
        }
    ]
}

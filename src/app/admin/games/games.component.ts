import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { GameService } from 'src/app/core/services/game.service';
import { ScriptsService } from 'src/app/core/services/scripts.service';

import { Game } from 'src/app/core/models/game.model';
import { Script } from 'src/app/core/models/script.model';

import { NgxSpinnerService } from "ngx-spinner";

declare const bootstrap: { Modal: { getInstance: (arg0: HTMLElement) => any; }; };

@Component({
    selector: 'app-script',
    templateUrl: './games.component.html',
    styleUrls: ['./games.component.scss']
})

export class GamesComponent implements OnInit {
    games: Game[] = [];
    gameForm: FormGroup;
    gameSubmitted = false;

    scripts: Script[] = [];

    constructor(
        private _gameService: GameService,
        private _scriptService: ScriptsService,
        private _formBuilder: FormBuilder,
        private spinner: NgxSpinnerService
    ) { }

    ngOnInit() {
        this.gameForm = this._formBuilder.group({
            name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
            scenarioId: new FormControl(null, Validators.required),
        });

        this.getAllGames();

        this.spinner.show();
        this._scriptService.getAll().subscribe({
            next: (scripts) => {
                this.scripts = scripts;
                this.spinner.hide();
            },
            error: response => {
                this.spinner.hide();
            }
        })
    }

    get fg() { return this.gameForm.controls; }

    getAllGames() {
        this.spinner.show();
        this._gameService.getAll().subscribe({
            next: (games) => {
                this.games = games;
                this.spinner.hide();
            },
            error: response => {
                this.spinner.hide();
            }
        })
    }

    addGame() {
        this.gameSubmitted = true;

        if (!this.gameForm.valid) {
            return;
        }

        let game: Game = {
            id: '',
            description: '',
            name: this.gameForm.get('name').value,
            scenarioId: this.gameForm.get('scenarioId').value,
        }
        this.spinner.show();
        this._gameService.create(game).subscribe({
            next: (data) => {
                let gameModalEl = document.getElementById('gameModal')
                let modal = bootstrap.Modal.getInstance(gameModalEl)
                modal.hide()

                this.gameForm.reset();

                this.getAllGames();
                this.spinner.hide();
            },
            error: response => {
                console.log('error')
                this.spinner.hide();
            }
        });

        this.gameSubmitted = false;
    }

    initGame(game: Game) {
        this.spinner.show();
        this._gameService.init(game.id).subscribe({
            next: (data) => {
                let initGameModalEl = document.getElementById('initGameModal')
                let modal = bootstrap.Modal.getInstance(initGameModalEl)
                modal.hide()

                this.getAllGames();
                this.spinner.hide();
            },
            error: response => {
                console.log('error')
                this.spinner.hide();
            }
        });
    }

    devideTeams() { }
}
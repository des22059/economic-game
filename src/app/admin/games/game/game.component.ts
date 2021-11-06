import { Component, OnInit } from '@angular/core';

import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';

import { Participant } from 'src/app/core/models/participant.model';
import { Bank } from 'src/app/core/models/bank.model';
import { Job } from 'src/app/core/models/job.model';
import { Item } from 'src/app/core/models/item.model';
import { JobType } from 'src/app/core/models/jobType.model';

import { BanksService } from 'src/app/core/services/banks.service';
import { ParticipantService } from 'src/app/core/services/participant.service';
import { ItemsService } from 'src/app/core/services/items.service';
import { JobsService } from 'src/app/core/services/jobs.service';

declare const bootstrap: { Modal: { getInstance: (arg0: HTMLElement) => any; }; };

@Component({
    selector: 'app-script',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {
    registered = false;
    participants: Participant[] = [];
    currentParticipant: Participant = null;

    banks: Bank[] = [];
    items: Item[] = [];
    jobTypes: JobType[] = [];

    constructor(
        private _route: ActivatedRoute,
        private _participantService: ParticipantService,
        private _banksService: BanksService,
        private _itemsService: ItemsService,
        private _jobsService: JobsService,
        private spinner: NgxSpinnerService,
    ) { }

    ngOnInit() {
        const gameId = this._route.snapshot.paramMap.get('id');
        const userId = localStorage.getItem('userId');

        this.getAllParticipants(gameId);
        this.getAllBanks(gameId);
        this.getAllItems(gameId);
        this.getAllJobTypes(gameId);

        if (this.participants.find(x => x.user.id === userId) !== null) {
            this.registered = true;
            this.currentParticipant = this.participants.find(x => x.user.id === userId);
            //wait for game
        } else {
            this.spinner.show();
            this._participantService.add(gameId, userId).subscribe({
                next: (response) => {
                    this.registered = true;
                    this.currentParticipant = response;
                    this.spinner.hide();
                },
                error: error => {
                    this.spinner.hide();
                }
            });
        }
    }

    getAllParticipants(gameId: string) {
        this.spinner.show();
        this._participantService.get(gameId).subscribe({
            next: (response) => {
                this.participants = response;
                this.spinner.hide();
            },
            error: error => {
                this.spinner.hide();
            }
        });
    }

    getAllBanks(gameId: string) {
        this.spinner.show();
        this._banksService.getAll(gameId).subscribe({
            next: (banks) => {
                this.banks = banks;
                this.spinner.hide();
            },
            error: error => {
                this.spinner.hide();
            }
        })
    }

    getAllItems(gameId: string) {
        this.spinner.show();
        this._itemsService.getAll(gameId).subscribe({
            next: (items) => {
                this.items = items;
                this.spinner.hide();
            },
            error: error => {
                this.spinner.hide();
            }
        })
    }

    getAllJobTypes(gameId: string) {
        this.spinner.show();
        this._jobsService.getAllTypes(gameId).subscribe({
            next: (jobTypes) => {
                this.jobTypes = jobTypes;
                this.spinner.hide();
            },
            error: error => {
                this.spinner.hide();
            }
        })
    }
}
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Ubaby\NodeJS Projects\musicorator\musicorator\src\main.ts */"zUnb");


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "GvNj":
/*!******************************************!*\
  !*** ./src/app/popup/popup.component.ts ***!
  \******************************************/
/*! exports provided: PopupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopupComponent", function() { return PopupComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _popup_messager_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./popup-messager.service */ "kfHb");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ "bTqV");






function PopupComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", item_r1.title, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](item_r1.content);
} }
class PopupComponent {
    constructor(messager) {
        this.messager = messager;
    }
    ngOnInit() {
        this.msg = this.messager.getMessage();
    }
    getCode(json) {
        if (json) {
            return this.messager.getPrettyCode(json);
        }
        else {
            return '';
        }
    }
}
PopupComponent.ɵfac = function PopupComponent_Factory(t) { return new (t || PopupComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_popup_messager_service__WEBPACK_IMPORTED_MODULE_1__["PopupMessagerService"])); };
PopupComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PopupComponent, selectors: [["app-popup"]], decls: 12, vars: 4, consts: [[2, "z-index", "9999"], ["mat-dialog-title", ""], [1, "mat-typography"], [4, "ngFor", "ngForOf"], [3, "innerHTML"], ["align", "end"], ["mat-button", "", "mat-dialog-close", ""], ["mat-button", "", "cdkFocusInitial", "", 3, "mat-dialog-close"]], template: function PopupComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h2", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-dialog-content", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, PopupComponent_div_4_Template, 5, 2, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "pre", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "mat-dialog-actions", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Close");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Accept");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.msg.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.msg.list);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("innerHTML", ctx.getCode(ctx.msg.code), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeHtml"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("mat-dialog-close", true);
    } }, directives: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogTitle"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogContent"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogActions"], _angular_material_button__WEBPACK_IMPORTED_MODULE_4__["MatButton"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogClose"]], styles: ["pre {\r\n  outline: 1px solid #ccc;\r\n  padding: 5px;\r\n  margin: 5px;\r\n}\r\n  .string {\r\n  color: green;\r\n}\r\n  .number {\r\n  color: darkorange;\r\n}\r\n  .boolean {\r\n  color: blue;\r\n}\r\n  .null {\r\n  color: magenta;\r\n}\r\n  .key {\r\n  color: red;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcG9wdXAvcG9wdXAuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHVCQUF1QjtFQUN2QixZQUFZO0VBQ1osV0FBVztBQUNiO0FBQ0E7RUFDRSxZQUFZO0FBQ2Q7QUFDQTtFQUNFLGlCQUFpQjtBQUNuQjtBQUNBO0VBQ0UsV0FBVztBQUNiO0FBQ0E7RUFDRSxjQUFjO0FBQ2hCO0FBQ0E7RUFDRSxVQUFVO0FBQ1oiLCJmaWxlIjoic3JjL2FwcC9wb3B1cC9wb3B1cC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOjpuZy1kZWVwIHByZSB7XHJcbiAgb3V0bGluZTogMXB4IHNvbGlkICNjY2M7XHJcbiAgcGFkZGluZzogNXB4O1xyXG4gIG1hcmdpbjogNXB4O1xyXG59XHJcbjo6bmctZGVlcCAuc3RyaW5nIHtcclxuICBjb2xvcjogZ3JlZW47XHJcbn1cclxuOjpuZy1kZWVwIC5udW1iZXIge1xyXG4gIGNvbG9yOiBkYXJrb3JhbmdlO1xyXG59XHJcbjo6bmctZGVlcCAuYm9vbGVhbiB7XHJcbiAgY29sb3I6IGJsdWU7XHJcbn1cclxuOjpuZy1kZWVwIC5udWxsIHtcclxuICBjb2xvcjogbWFnZW50YTtcclxufVxyXG46Om5nLWRlZXAgLmtleSB7XHJcbiAgY29sb3I6IHJlZDtcclxufVxyXG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PopupComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-popup',
                templateUrl: './popup.component.html',
                styleUrls: ['./popup.component.css'],
            }]
    }], function () { return [{ type: _popup_messager_service__WEBPACK_IMPORTED_MODULE_1__["PopupMessagerService"] }]; }, null); })();


/***/ }),

/***/ "M0k3":
/*!**********************************************************!*\
  !*** ./src/app/music-tagging/music-tagging.component.ts ***!
  \**********************************************************/
/*! exports provided: MusicTaggingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MusicTaggingComponent", function() { return MusicTaggingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _electron_communicator_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../electron-communicator.service */ "m1ck");
/* harmony import */ var _suggestion_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./suggestion.service */ "PtbL");
/* harmony import */ var _helper_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helper.service */ "hCTW");
/* harmony import */ var _popup_popup_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../popup/popup.service */ "UVxI");
/* harmony import */ var _drag_edit_unique_chips_drag_edit_unique_chips_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../drag-edit-unique-chips/drag-edit-unique-chips.component */ "OjB1");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _anti_spam_click_directive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../anti-spam-click.directive */ "aOXw");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/checkbox */ "bSwM");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ "3Pt+");












class MusicTaggingComponent {
    constructor(communicator, suggestionService, helper, dialog) {
        this.communicator = communicator;
        this.suggestionService = suggestionService;
        this.helper = helper;
        this.dialog = dialog;
        this.suggestionKeys = [
            'album',
            'artist',
            'bpm',
            'composer',
            'initialKey',
            'title',
        ];
    }
    ngOnInit() {
        this.subscriptions = [];
        this.subscriptions.push(this.setPlaySongListener());
        this.subscriptions.push(this.setSaveSongListener());
        this.tagsSuggestion = this.suggestionService.getSuggestionTags();
        this.discretizedSuggestions = this.suggestionService.getSuggestionTagsDiscretized();
        this.setProgressAndFeedback(false, '', false);
        this.setSongDetails(this.currentMetadataObject);
    }
    ngOnChanges() {
        this.tagsSuggestion = this.suggestionService.getSuggestionTags();
        this.discretizedSuggestions = this.suggestionService.getSuggestionTagsDiscretized();
        this.setProgressAndFeedback(false, '', false);
        this.setSongDetails(this.currentMetadataObject);
    }
    ngOnDestroy() {
        for (const subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
    }
    playSong() {
        const options = {
            key: 'playAudio',
            dir: this.currentFile,
        };
        this.setProgressAndFeedback(true, 'Playing Audio...', false);
        this.communicator.sendToElectron(options);
    }
    saveSongData() {
        const tags = this.getTagsFormatted();
        const options = {
            key: 'setMusicData',
            dir: this.currentFile,
            tagsObject: tags,
        };
        if (this.currentFile && tags) {
            this.setProgressAndFeedback(true, 'Saving Audio Data...', true);
            this.communicator.sendToElectron(options);
        }
        else {
            this.feedback('Not saving empty.', true);
        }
    }
    setPlaySongListener() {
        return this.communicator
            .listenToElectronConstantly('playAudio')
            .subscribe((result) => {
            this.setProgressAndFeedback(false, 'Played Audio.', false);
        });
    }
    setSaveSongListener() {
        return this.communicator
            .listenToElectronConstantly('setMusicData')
            .subscribe((result) => {
            this.setProgressAndFeedback(false, 'Saved Audio.', true);
        });
    }
    getFileName() {
        return this.communicator.getFileName(this.currentFile);
    }
    showMore() {
        if (this.currentMetadataObject) {
            this.openDialog('Full Code', '', this.currentMetadataObject);
        }
        else {
            this.feedback('Could not get music data.', true);
        }
    }
    openDialog(titleIn, message, codeIn) {
        const dialogMessage = {
            title: 'Music Data',
            list: [{ title: titleIn, content: message }],
            code: codeIn,
        };
        this.dialog.openDialog(dialogMessage).then((reply) => { });
    }
    setSongDetails(result) {
        if (result) {
            this.setSuggestionsFromTrack(result);
            this.setTagsArray(result);
        }
        else {
            this.feedback('No Audio Metadata.', false);
        }
    }
    setSuggestionsFromTrack(result) {
        const arr = this.helper.getValuesFromKeys(result, this.suggestionKeys);
        const uniques = this.helper.getOnlyUnique(arr);
        const trimmed = this.helper.getTrimmedArray(uniques);
        const lowered = this.helper.getLowerCaseArray(trimmed);
        this.tagsSuggestion = this.tagsSuggestion.concat(lowered);
    }
    setTagsArray(result) {
        let tags = [];
        if (result.comment) {
            let tagsResult = '';
            const comment = result.comment;
            if (comment.text) {
                tagsResult = comment.text;
                tags = this.getCommentAsArray(tagsResult);
            }
        }
        this.tagsArray = tags;
        this.trySort();
    }
    getCommentAsArray(comment) {
        if (comment) {
            const c = comment.toString();
            let arr = c.split(',');
            if (arr) {
                arr = this.helper.getLowerCaseArray(arr);
                return this.helper.getTrimmedArray(arr);
            }
        }
        return [''];
    }
    getTagsFormatted() {
        if (this.tagsArray) {
            if (this.tagsArray.length) {
                const trimedArr = this.tagsArray.map((str) => str.trim().toLowerCase());
                const tagString = trimedArr.join(',');
                const updatedComment = {
                    language: 'eng',
                    shortText: '',
                    text: tagString,
                };
                // library requires top object // I didn't realize and ruined some files :D
                // update just edits tags added, write overwrites and deletes the rest
                const tags = {
                    COMM: updatedComment,
                    comment: updatedComment,
                };
                return tags;
            }
        }
        return '';
    }
    setProgressAndFeedback(b, s, isImportant) {
        this.isLoading = b;
        if (!b) {
            this.progress = 100;
        }
        if (b) {
            this.progress = 0;
            this.feedbackCounter = 0;
        }
        if (s) {
            this.feedback(s, isImportant);
        }
    }
    feedback(s, isImportant) {
        if (isImportant && s) {
            this.helper.feedback(JSON.stringify(s));
        }
        this.currentFeedback = s;
    }
    trySort() {
        if (this.isSort) {
            this.helper.sortArrayByLength(this.tagsArray);
        }
    }
}
MusicTaggingComponent.ɵfac = function MusicTaggingComponent_Factory(t) { return new (t || MusicTaggingComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_electron_communicator_service__WEBPACK_IMPORTED_MODULE_1__["ElectronCommunicatorService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_suggestion_service__WEBPACK_IMPORTED_MODULE_2__["SuggestionService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_helper_service__WEBPACK_IMPORTED_MODULE_3__["HelperService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_popup_popup_service__WEBPACK_IMPORTED_MODULE_4__["PopupService"])); };
MusicTaggingComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: MusicTaggingComponent, selectors: [["app-music-tagging"]], inputs: { currentFile: "currentFile", currentMetadataObject: "currentMetadataObject" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]], decls: 25, vars: 10, consts: [[1, "container-fluid"], [1, "row"], [3, "suggestionsArray", "resultsArray", "isHorizontal"], [1, "mini-button"], ["mat-mini-fab", "", "color", "warn", "appAntiSpamClick", "", "aria-label", "Play", 3, "debounceTime", "debounceClick"], ["mat-mini-fab", "", "color", "primary", "appAntiSpamClick", "", "aria-label", "more", 3, "debounceTime", "debounceClick"], ["mat-mini-fab", "", "color", "primary", "appAntiSpamClick", "", "aria-label", "Play", 3, "debounceTime", "debounceClick"], [1, "checkbox"], [3, "ngModel", "click", "ngModelChange"], [1, "row", 2, "color", "grey"]], template: function MusicTaggingComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "app-drag-edit-unique-chips", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("debounceClick", function MusicTaggingComponent_Template_button_debounceClick_9_listener() { return ctx.saveSongData(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "save");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("debounceClick", function MusicTaggingComponent_Template_button_debounceClick_13_listener() { return ctx.showMore(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "open_in_new");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("debounceClick", function MusicTaggingComponent_Template_button_debounceClick_17_listener() { return ctx.playSong(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "play_arrow");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "mat-checkbox", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MusicTaggingComponent_Template_mat_checkbox_click_21_listener() { return ctx.trySort(); })("ngModelChange", function MusicTaggingComponent_Template_mat_checkbox_ngModelChange_21_listener($event) { return ctx.isSort = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Auto Sort");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.getFileName());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.currentFile);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("suggestionsArray", ctx.tagsSuggestion)("resultsArray", ctx.tagsArray)("isHorizontal", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("debounceTime", 300);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("debounceTime", 300);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("debounceTime", 300);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.isSort);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.currentFeedback);
    } }, directives: [_drag_edit_unique_chips_drag_edit_unique_chips_component__WEBPACK_IMPORTED_MODULE_5__["DragEditUniqueChipsComponent"], _angular_material_button__WEBPACK_IMPORTED_MODULE_6__["MatButton"], _anti_spam_click_directive__WEBPACK_IMPORTED_MODULE_7__["AntiSpamClickDirective"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__["MatIcon"], _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_9__["MatCheckbox"], _angular_forms__WEBPACK_IMPORTED_MODULE_10__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_10__["NgModel"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL211c2ljLXRhZ2dpbmcvbXVzaWMtdGFnZ2luZy5jb21wb25lbnQuY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MusicTaggingComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-music-tagging',
                templateUrl: './music-tagging.component.html',
                styleUrls: ['./music-tagging.component.css'],
            }]
    }], function () { return [{ type: _electron_communicator_service__WEBPACK_IMPORTED_MODULE_1__["ElectronCommunicatorService"] }, { type: _suggestion_service__WEBPACK_IMPORTED_MODULE_2__["SuggestionService"] }, { type: _helper_service__WEBPACK_IMPORTED_MODULE_3__["HelperService"] }, { type: _popup_popup_service__WEBPACK_IMPORTED_MODULE_4__["PopupService"] }]; }, { currentFile: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], currentMetadataObject: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "OjB1":
/*!****************************************************************************!*\
  !*** ./src/app/drag-edit-unique-chips/drag-edit-unique-chips.component.ts ***!
  \****************************************************************************/
/*! exports provided: DragEditUniqueChipsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DragEditUniqueChipsComponent", function() { return DragEditUniqueChipsComponent; });
/* harmony import */ var _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/cdk/keycodes */ "FtGj");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/drag-drop */ "5+WD");
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/chips */ "A5z7");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");







function DragEditUniqueChipsComponent_mat_chip_4_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-chip", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("removed", function DragEditUniqueChipsComponent_mat_chip_4_Template_mat_chip_removed_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r9); const tag_r6 = ctx.$implicit; const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r8.removeSuggestion(tag_r6); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "mat-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const tag_r6 = ctx.$implicit;
    const i_r7 = ctx.index;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstyleMap"](" color:white" + ";background-color:" + ctx_r1.colors[i_r7]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("removable", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", tag_r6, " ");
} }
function DragEditUniqueChipsComponent_mat_chip_9_Template(rf, ctx) { if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-chip", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("removed", function DragEditUniqueChipsComponent_mat_chip_9_Template_mat_chip_removed_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r13); const tag_r10 = ctx.$implicit; const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r12.remove(tag_r10); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "mat-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const tag_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("removable", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", tag_r10, " ");
} }
const _c0 = function (a0) { return [a0]; };
class DragEditUniqueChipsComponent {
    constructor() {
        this.separatorKeysCodes = [_angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_0__["ENTER"], _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_0__["COMMA"]];
        this.resultsArray = [];
        this.suggestionsArray = [];
        this.isHorizontal = true;
        this.hasFeedback = true;
        this.feedbackMessage = '';
        this.isTimeoutSet = false;
        this.colors = [
            '#6e40aa',
            '#7d3faf',
            '#8e3eb2',
            '#9e3db3',
            '#af3cb2',
            '#bf3caf',
            '#cf3da9',
            '#dd3fa2',
            '#ea4299',
            '#f5468e',
            '#fe4b83',
            '#ff5276',
            '#ff5a6a',
            '#ff635d',
            '#ff6d51',
            '#ff7847',
            '#ff833d',
            '#ff9036',
            '#f69d31',
            '#edaa2e',
            '#e2b72f',
            '#d7c432',
            '#ccd038',
            '#c1dc41',
            '#b7e64c',
            '#aff05b',
            '#9cf357',
            '#88f557',
            '#75f65a',
            '#63f75f',
            '#52f667',
            '#43f471',
            '#36f17c',
            '#2bec89',
            '#23e696',
            '#1ddfa3',
            '#1ad6b0',
            '#19cdbc',
            '#1bc2c7',
            '#1eb7d1',
            '#23abd8',
            '#2a9fde',
            '#3292e1',
            '#3a86e1',
            '#437ae0',
            '#4c6edb',
            '#5563d5',
            '#5d59cd',
            '#6450c3',
            '#6947b7',
        ];
    }
    ngOnInit() { }
    ngOnDestroy() {
        if (this.currentTimeout) {
            clearTimeout(this.currentTimeout);
        }
    }
    // feedback(msg: string): void {
    //
    // }
    drop(event) {
        if (event.previousContainer === event.container) {
            // moveItemInArray(
            //   event.container.data,
            //   event.previousIndex,
            //   event.currentIndex
            // );
        }
        else {
            const currentPick = event.previousContainer.data[event.previousIndex];
            // copy if unique
            const unique = this.isNotIn(currentPick, this.resultsArray);
            if (unique) {
                this.resultsArray.push(currentPick);
            }
            else {
                this.feedback('Already added.');
            }
        }
    }
    addSuggestion(event) {
        const input = event.input;
        const value = event.value;
        const unique = this.isNotIn(value, this.suggestionsArray);
        if (unique) {
            if ((value || '').trim()) {
                this.suggestionsArray.push(value.trim().toLowerCase());
            }
            if (input) {
                input.value = '';
            }
        }
        else {
            this.feedback('Already added.');
        }
    }
    removeSuggestion(tag) {
        const index = this.suggestionsArray.indexOf(tag);
        if (index >= 0) {
            this.suggestionsArray.splice(index, 1);
        }
    }
    add(event) {
        const input = event.input;
        const value = event.value;
        const unique = this.isNotIn(value, this.resultsArray);
        if (unique) {
            if ((value || '').trim()) {
                this.resultsArray.push(value.trim().toLowerCase());
            }
            if (input) {
                input.value = '';
            }
        }
        else {
            this.feedback('Already added.');
        }
    }
    remove(tag) {
        const index = this.resultsArray.indexOf(tag);
        if (index >= 0) {
            this.resultsArray.splice(index, 1);
        }
    }
    // only add if unique
    isNotIn(val, arr) {
        return !(arr.indexOf(val) > -1);
    }
    feedback(s) {
        console.log(s);
        if (this.hasFeedback) {
            this.clearMessageSafely();
        }
        this.feedbackMessage = s;
    }
    clearMessageSafely() {
        if (!this.isTimeoutSet) {
            this.isTimeoutSet = true;
            this.currentTimeout = setTimeout(() => {
                this.feedbackMessage = '';
                this.isTimeoutSet = false;
            }, 3000);
        }
    }
}
DragEditUniqueChipsComponent.ɵfac = function DragEditUniqueChipsComponent_Factory(t) { return new (t || DragEditUniqueChipsComponent)(); };
DragEditUniqueChipsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: DragEditUniqueChipsComponent, selectors: [["app-drag-edit-unique-chips"]], inputs: { resultsArray: "resultsArray", suggestionsArray: "suggestionsArray", isHorizontal: "isHorizontal", hasFeedback: "hasFeedback", feedbackMessage: "feedbackMessage" }, decls: 21, vars: 15, consts: [[2, "position", "relative"], ["cdkDropList", "", 3, "cdkDropListData", "cdkDropListConnectedTo", "cdkDropListDropped"], ["suggestions", "cdkDropList"], ["cdkDrag", "", 3, "style", "removable", "removed", 4, "ngFor", "ngForOf"], ["placeholder", "New Type...", 3, "matChipInputFor", "matChipInputSeparatorKeyCodes", "matChipInputTokenEnd"], ["cdkDropList", "", 1, "example-chip", 3, "cdkDropListData", "cdkDropListConnectedTo", "cdkDropListDropped"], ["results", "cdkDropList"], ["class", "example-box", "cdkDrag", "", 3, "removable", "removed", 4, "ngFor", "ngForOf"], [2, "display", "none"], ["suggestions2", ""], ["results2", ""], [1, "mini-feedback"], ["cdkDrag", "", 3, "removable", "removed"], ["matChipRemove", ""], ["cdkDrag", "", 1, "example-box", 3, "removable", "removed"]], template: function DragEditUniqueChipsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("cdkDropListDropped", function DragEditUniqueChipsComponent_Template_div_cdkDropListDropped_1_listener($event) { return ctx.drop($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "mat-chip-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, DragEditUniqueChipsComponent_mat_chip_4_Template, 4, 4, "mat-chip", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("matChipInputTokenEnd", function DragEditUniqueChipsComponent_Template_input_matChipInputTokenEnd_5_listener($event) { return ctx.addSuggestion($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "mat-chip-list", 5, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("cdkDropListDropped", function DragEditUniqueChipsComponent_Template_mat_chip_list_cdkDropListDropped_7_listener($event) { return ctx.drop($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, DragEditUniqueChipsComponent_mat_chip_9_Template, 4, 2, "mat-chip", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("matChipInputTokenEnd", function DragEditUniqueChipsComponent_Template_input_matChipInputTokenEnd_10_listener($event) { return ctx.add($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "mat-chip-list", 8, 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "mat-chip");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, " placeholder ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "mat-chip-list", 8, 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "mat-chip");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, " placeholder ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](20);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](2);
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](8);
        const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](12);
        const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("cdkDropListData", ctx.suggestionsArray)("cdkDropListConnectedTo", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](11, _c0, _r2));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.suggestionsArray);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("matChipInputFor", _r4)("matChipInputSeparatorKeyCodes", ctx.separatorKeysCodes);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("cdkDropListData", ctx.resultsArray)("cdkDropListConnectedTo", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](13, _c0, _r0));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.resultsArray);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("matChipInputFor", _r5)("matChipInputSeparatorKeyCodes", ctx.separatorKeysCodes);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.feedbackMessage);
    } }, directives: [_angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_2__["CdkDropList"], _angular_material_chips__WEBPACK_IMPORTED_MODULE_3__["MatChipList"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], _angular_material_chips__WEBPACK_IMPORTED_MODULE_3__["MatChipInput"], _angular_material_chips__WEBPACK_IMPORTED_MODULE_3__["MatChip"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_2__["CdkDrag"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__["MatIcon"], _angular_material_chips__WEBPACK_IMPORTED_MODULE_3__["MatChipRemove"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2RyYWctZWRpdC11bmlxdWUtY2hpcHMvZHJhZy1lZGl0LXVuaXF1ZS1jaGlwcy5jb21wb25lbnQuY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](DragEditUniqueChipsComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'app-drag-edit-unique-chips',
                templateUrl: './drag-edit-unique-chips.component.html',
                styleUrls: ['./drag-edit-unique-chips.component.css'],
            }]
    }], function () { return []; }, { resultsArray: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], suggestionsArray: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], isHorizontal: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], hasFeedback: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], feedbackMessage: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }] }); })();


/***/ }),

/***/ "PtbL":
/*!*****************************************************!*\
  !*** ./src/app/music-tagging/suggestion.service.ts ***!
  \*****************************************************/
/*! exports provided: SuggestionService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SuggestionService", function() { return SuggestionService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class SuggestionService {
    constructor() {
        this.suggestionTags = [
            'active',
            'passive',
            'fast',
            'slow',
            'happy',
            'sad',
            'instrumental',
            'cool',
            'weird',
            'uplifting',
            'loud',
            'quiet',
            'funky',
            'chill',
            'classical',
            'progressive',
            'electronic',
            'rap',
            'rock',
            'dance',
            'house',
            'pop',
            'dnb',
            'classy',
            'cute',
            'light',
            'heavy',
            'epic',
            'melodic',
            'rhythmic',
            'deep',
            'old',
            'new',
            'vocal',
            'female',
            'male',
        ];
        this.discretizedSuggestions = [
            {
                color: 'blue',
                arr: ['active', 'passive', 'fast', 'slow', 'happy', 'sad'],
            },
            {
                color: 'red',
                arr: [
                    'instrumental',
                    'cool',
                    'weird',
                    'uplifting',
                    'loud',
                    'quiet',
                    'funky',
                    'chill',
                ],
            },
            {
                color: 'pink',
                arr: [
                    'classical',
                    'progressive',
                    'electronic',
                    'rap',
                    'rock',
                    'dance',
                    'house',
                    'pop',
                    'dnb',
                ],
            },
            {
                color: 'yellow',
                arr: [
                    'classy',
                    'cute',
                    'light',
                    'heavy',
                    'epic',
                    'melodic',
                    'rhythmic',
                    'deep',
                ],
            },
            { color: 'green', arr: ['old', 'new', 'vocal', 'female', 'male'] },
            { color: 'black', arr: [] },
        ];
    }
    setSuggestionTags(suggestionTags) {
        this.suggestionTags = suggestionTags;
    }
    setSuggestionTagsDiscretized(discretizedSuggestionsIn) {
        this.discretizedSuggestions = discretizedSuggestionsIn;
    }
    getSuggestionTags() {
        return this.suggestionTags;
    }
    getSuggestionTagsDiscretized() {
        return this.discretizedSuggestions;
    }
}
SuggestionService.ɵfac = function SuggestionService_Factory(t) { return new (t || SuggestionService)(); };
SuggestionService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: SuggestionService, factory: SuggestionService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SuggestionService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "QIEW":
/*!******************************************************************!*\
  !*** ./src/app/music-tagger-list/music-tagger-list.component.ts ***!
  \******************************************************************/
/*! exports provided: MusicTaggerListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MusicTaggerListComponent", function() { return MusicTaggerListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _electron_communicator_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../electron-communicator.service */ "m1ck");
/* harmony import */ var _helper_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helper.service */ "hCTW");
/* harmony import */ var _music_tagging_music_tagging_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../music-tagging/music-tagging.component */ "M0k3");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _anti_spam_click_directive__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../anti-spam-click.directive */ "aOXw");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/progress-bar */ "bv9b");













function MusicTaggerListComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("debounceClick", function MusicTaggerListComponent_div_3_Template_div_debounceClick_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4); const file_r2 = ctx.$implicit; const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r3.setCurrentFile(file_r2); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "button", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MusicTaggerListComponent_div_3_Template_button_click_5_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4); const file_r2 = ctx.$implicit; const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5.playSong(file_r2); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "play_arrow");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const file_r2 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx_r0.currentFile === file_r2 ? "row selected" : "row");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("debounceTime", 1000);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r0.getFileName(file_r2), " ");
} }
function MusicTaggerListComponent_div_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Loading... ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "mat-progress-bar", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", ctx_r1.progress);
} }
class MusicTaggerListComponent {
    constructor(communicator, helper) {
        this.communicator = communicator;
        this.helper = helper;
        this.isPlayAndData = true;
        this.currentFolder = 'C:/Users';
        this.fileContains = '.mp3';
        this.folders = [];
    }
    ngOnInit() {
        this.setProgressAndFeedback(false, '', false);
        this.subscriptions = [];
        this.subscriptions.push(this.setLoadFolderListener());
        this.subscriptions.push(this.setGetFilesByTypeListener());
        this.subscriptions.push(this.setPlaySongListener());
        this.subscriptions.push(this.setGetSongListener());
    }
    ngOnDestroy() {
        for (const subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
    }
    setCurrentFile(file) {
        this.currentFile = file;
        this.getSongData();
    }
    playSong(file) {
        this.currentFile = file;
        const options = {
            key: 'playAudio',
            dir: file,
        };
        this.setProgressAndFeedback(true, 'Playing Audio...', false);
        this.communicator.sendToElectron(options);
        if (this.isPlayAndData) {
            this.getSongData();
        }
    }
    openFolder() {
        const options = {
            key: 'openDirectory',
        };
        this.setProgressAndFeedback(true, 'Opening Directory...', true);
        this.communicator.sendToElectron(options);
    }
    getFilesByType() {
        const options = {
            key: 'getFilesByType',
            dir: this.currentFolder,
            type: this.fileContains,
        };
        this.setProgressAndFeedback(true, 'Getting Files...', true);
        this.communicator.sendToElectron(options);
    }
    getSongData() {
        const options = {
            key: 'getMusicData',
            dir: this.currentFile,
        };
        this.setProgressAndFeedback(true, 'Getting Audio Data...', false);
        this.communicator.sendToElectron(options);
    }
    setLoadFolderListener() {
        return this.communicator
            .listenToElectronConstantly('openDirectory')
            .subscribe((result) => {
            this.currentFolder = result;
            this.setProgressAndFeedback(false, 'Opened Directory.', true);
            setTimeout(() => {
                this.getFilesByType();
            }, 500);
        });
    }
    setGetFilesByTypeListener() {
        return this.communicator
            .listenToElectronConstantly('getFilesByType')
            .subscribe((result) => {
            this.folders = result;
            this.setProgressAndFeedback(false, 'Received Files.', true);
        });
    }
    setPlaySongListener() {
        return this.communicator
            .listenToElectronConstantly('playAudio')
            .subscribe((result) => {
            this.setProgressAndFeedback(false, 'Played Audio.', false);
        });
    }
    setGetSongListener() {
        return this.communicator
            .listenToElectronConstantly('getMusicData')
            .subscribe((result) => {
            this.currentMetaDataObject = result;
            this.setProgressAndFeedback(false, 'Received Audio Data.', false);
        });
    }
    getFileName(name) {
        return this.communicator.getFileName(name);
    }
    setProgressAndFeedback(b, s, isImportant) {
        this.isLoading = b;
        if (!b) {
            this.progress = 100;
        }
        if (b) {
            this.progress = 0;
            this.feedbackCounter = 0;
        }
        if (s) {
            this.feedback(s, isImportant);
        }
    }
    getFeedBack() {
        return this.currentFeedback;
    }
    feedback(s, isImportant) {
        if (isImportant) {
            this.helper.feedback(JSON.stringify(s));
        }
        this.currentFeedback = JSON.stringify(s);
    }
}
MusicTaggerListComponent.ɵfac = function MusicTaggerListComponent_Factory(t) { return new (t || MusicTaggerListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_electron_communicator_service__WEBPACK_IMPORTED_MODULE_1__["ElectronCommunicatorService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_helper_service__WEBPACK_IMPORTED_MODULE_2__["HelperService"])); };
MusicTaggerListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: MusicTaggerListComponent, selectors: [["app-music-tagger-list"]], inputs: { fileContains: "fileContains" }, decls: 16, vars: 7, consts: [[1, "container-fluid"], [1, "menu"], [3, "currentFile", "currentMetadataObject"], ["class", "container-fluid", 4, "ngFor", "ngForOf"], [1, "footer-feedback", 2, "color", "grey"], [1, "footer"], [2, "width", "100px"], ["matInput", "", 3, "ngModel", "ngModelChange"], ["mat-fab", "", "color", "primary", "appAntiSpamClick", "", "aria-label", "Play", 3, "debounceTime", "debounceClick"], [4, "ngIf"], [1, "container-fluid", 2, "height", "500px"], [1, "row", 3, "ngClass"], ["appAntiSpamClick", "", 1, "col-10", "button-align", "clickable-text", 3, "debounceTime", "debounceClick"], [1, "col-2"], ["mat-mini-fab", "", "color", "white", "aria-label", "Play", 1, "mini-button", 3, "click"], ["mode", "determinate", 3, "value"]], template: function MusicTaggerListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "app-music-tagging", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, MusicTaggerListComponent_div_3_Template, 8, 3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "mat-form-field", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "File Type");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "input", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function MusicTaggerListComponent_Template_input_ngModelChange_10_listener($event) { return ctx.fileContains = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("debounceClick", function MusicTaggerListComponent_Template_button_debounceClick_11_listener() { return ctx.openFolder(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "folder_open");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, MusicTaggerListComponent_div_14_Template, 3, 1, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "div", 10);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("currentFile", ctx.currentFile)("currentMetadataObject", ctx.currentMetaDataObject);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.folders);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" Last action:", ctx.currentFeedback, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.fileContains);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("debounceTime", 300);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.isLoading);
    } }, directives: [_music_tagging_music_tagging_component__WEBPACK_IMPORTED_MODULE_3__["MusicTaggingComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatFormField"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatLabel"], _angular_material_input__WEBPACK_IMPORTED_MODULE_6__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgModel"], _angular_material_button__WEBPACK_IMPORTED_MODULE_8__["MatButton"], _anti_spam_click_directive__WEBPACK_IMPORTED_MODULE_9__["AntiSpamClickDirective"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__["MatIcon"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgClass"], _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_11__["MatProgressBar"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL211c2ljLXRhZ2dlci1saXN0L211c2ljLXRhZ2dlci1saXN0LmNvbXBvbmVudC5jc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MusicTaggerListComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-music-tagger-list',
                templateUrl: './music-tagger-list.component.html',
                styleUrls: ['./music-tagger-list.component.css'],
            }]
    }], function () { return [{ type: _electron_communicator_service__WEBPACK_IMPORTED_MODULE_1__["ElectronCommunicatorService"] }, { type: _helper_service__WEBPACK_IMPORTED_MODULE_2__["HelperService"] }]; }, { fileContains: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "Rdl1":
/*!**********************************************************************************!*\
  !*** ./src/app/sortable-searchable-table/sortable-searchable-table.component.ts ***!
  \**********************************************************************************/
/*! exports provided: SortableSearchableTableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SortableSearchableTableComponent", function() { return SortableSearchableTableComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class SortableSearchableTableComponent {
    constructor() { }
    ngOnInit() {
    }
}
SortableSearchableTableComponent.ɵfac = function SortableSearchableTableComponent_Factory(t) { return new (t || SortableSearchableTableComponent)(); };
SortableSearchableTableComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SortableSearchableTableComponent, selectors: [["app-sortable-searchable-table"]], decls: 2, vars: 0, template: function SortableSearchableTableComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "sortable-searchable-table works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NvcnRhYmxlLXNlYXJjaGFibGUtdGFibGUvc29ydGFibGUtc2VhcmNoYWJsZS10YWJsZS5jb21wb25lbnQuY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SortableSearchableTableComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-sortable-searchable-table',
                templateUrl: './sortable-searchable-table.component.html',
                styleUrls: ['./sortable-searchable-table.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _electron_communicator_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./electron-communicator.service */ "m1ck");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");




const _c0 = function () { return ["nav-active"]; };
class AppComponent {
    constructor(communicator) {
        this.communicator = communicator;
        this.listeners = [];
        this.title = 'app-name';
        this.folder = 'C:/Users/Guest/Desktop';
        this.files = [];
    }
    ngOnInit() {
        // TODO: must push so you can unsubscribe or will be problematic when navigating
        this.listeners = [];
        this.listeners.push(this.getFilesListener());
        this.listeners.push(this.getFeedbackListener());
    }
    ngOnDestroy() {
        // TODO: must unsubscribe or will be problematic when navigating
        for (const l of this.listeners) {
            if (l) {
                l.unsubscribe();
            }
        }
    }
    // TODO: ask electron to do something
    getFiles() {
        const options = {
            key: 'getFilesByType',
            dir: this.folder,
            type: 'txt',
        };
        this.communicator.sendToElectron(options);
    }
    // TODO: wait for electron to respond
    getFilesListener() {
        return this.communicator
            .listenToElectronConstantly('getFilesByType')
            .subscribe((result) => {
            console.log(result);
            this.files = result;
        });
    }
    getFeedbackListener() {
        return this.communicator
            .listenToElectronConstantly('getFeedback')
            .subscribe((result) => {
            console.log(result);
        });
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_electron_communicator_service__WEBPACK_IMPORTED_MODULE_1__["ElectronCommunicatorService"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], inputs: { folder: "folder" }, decls: 11, vars: 4, consts: [[1, "navbar", "navbar-dark", "bg-dark"], [1, "navbar-brand"], [1, "nav"], [1, "nav-item"], ["routerLink", "/music-sorter", 1, "nav-link", 3, "routerLinkActive"], ["routerLink", "/music-tagger", 1, "nav-link", 3, "routerLinkActive"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "nav", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Musicorizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "ul", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "li", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Sorter");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "li", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Tagger");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "router-outlet");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLinkActive", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](2, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLinkActive", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](3, _c0));
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkActive"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.css'],
            }]
    }], function () { return [{ type: _electron_communicator_service__WEBPACK_IMPORTED_MODULE_1__["ElectronCommunicatorService"] }]; }, { folder: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "UVxI":
/*!****************************************!*\
  !*** ./src/app/popup/popup.service.ts ***!
  \****************************************/
/*! exports provided: PopupService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopupService", function() { return PopupService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _popup_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./popup.component */ "GvNj");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _popup_messager_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./popup-messager.service */ "kfHb");





class PopupService {
    constructor(dialog, messager) {
        this.dialog = dialog;
        this.messager = messager;
    }
    openDialog(msg) {
        this.messager.setMessage(msg);
        const dialogRef = this.dialog.open(_popup_component__WEBPACK_IMPORTED_MODULE_1__["PopupComponent"]);
        const promise = dialogRef.afterClosed().toPromise();
        return promise;
    }
}
PopupService.ɵfac = function PopupService_Factory(t) { return new (t || PopupService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_popup_messager_service__WEBPACK_IMPORTED_MODULE_3__["PopupMessagerService"])); };
PopupService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: PopupService, factory: PopupService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PopupService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] }, { type: _popup_messager_service__WEBPACK_IMPORTED_MODULE_3__["PopupMessagerService"] }]; }, null); })();


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/chips */ "A5z7");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/table */ "+0xr");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/snack-bar */ "dNgK");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/checkbox */ "bSwM");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/progress-bar */ "bv9b");
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/sort */ "Dh3D");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/cdk/drag-drop */ "5+WD");
/* harmony import */ var ngx_electron__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ngx-electron */ "31Lz");
/* harmony import */ var _drag_edit_unique_chips_drag_edit_unique_chips_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./drag-edit-unique-chips/drag-edit-unique-chips.component */ "OjB1");
/* harmony import */ var _music_sorter_music_sorter_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./music-sorter/music-sorter.component */ "hflD");
/* harmony import */ var _music_tagger_list_music_tagger_list_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./music-tagger-list/music-tagger-list.component */ "QIEW");
/* harmony import */ var _music_tagging_music_tagging_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./music-tagging/music-tagging.component */ "M0k3");
/* harmony import */ var _popup_popup_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./popup/popup.component */ "GvNj");
/* harmony import */ var _pretty_code_pretty_code_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./pretty-code/pretty-code.component */ "aGi1");
/* harmony import */ var _sortable_searchable_table_sortable_searchable_table_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./sortable-searchable-table/sortable-searchable-table.component */ "Rdl1");
/* harmony import */ var _anti_spam_click_directive__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./anti-spam-click.directive */ "aOXw");
// angular imports






// material imports










// other angular

// other

// components and services









class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
            _angular_material_chips__WEBPACK_IMPORTED_MODULE_6__["MatChipsModule"],
            _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_16__["DragDropModule"],
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__["MatIconModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_0__["BrowserAnimationsModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_8__["MatButtonModule"],
            _angular_material_table__WEBPACK_IMPORTED_MODULE_9__["MatTableModule"],
            ngx_electron__WEBPACK_IMPORTED_MODULE_17__["NgxElectronModule"],
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__["MatDialogModule"],
            _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_11__["MatSnackBarModule"],
            _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_12__["MatCheckboxModule"],
            _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_13__["MatProgressBarModule"],
            _angular_material_sort__WEBPACK_IMPORTED_MODULE_14__["MatSortModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_15__["MatInputModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
        _drag_edit_unique_chips_drag_edit_unique_chips_component__WEBPACK_IMPORTED_MODULE_18__["DragEditUniqueChipsComponent"],
        _music_sorter_music_sorter_component__WEBPACK_IMPORTED_MODULE_19__["MusicSorterComponent"],
        _music_tagger_list_music_tagger_list_component__WEBPACK_IMPORTED_MODULE_20__["MusicTaggerListComponent"],
        _music_tagging_music_tagging_component__WEBPACK_IMPORTED_MODULE_21__["MusicTaggingComponent"],
        _popup_popup_component__WEBPACK_IMPORTED_MODULE_22__["PopupComponent"],
        _pretty_code_pretty_code_component__WEBPACK_IMPORTED_MODULE_23__["PrettyCodeComponent"],
        _sortable_searchable_table_sortable_searchable_table_component__WEBPACK_IMPORTED_MODULE_24__["SortableSearchableTableComponent"],
        _anti_spam_click_directive__WEBPACK_IMPORTED_MODULE_25__["AntiSpamClickDirective"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
        _angular_material_chips__WEBPACK_IMPORTED_MODULE_6__["MatChipsModule"],
        _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_16__["DragDropModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__["MatIconModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_0__["BrowserAnimationsModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_8__["MatButtonModule"],
        _angular_material_table__WEBPACK_IMPORTED_MODULE_9__["MatTableModule"],
        ngx_electron__WEBPACK_IMPORTED_MODULE_17__["NgxElectronModule"],
        _angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__["MatDialogModule"],
        _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_11__["MatSnackBarModule"],
        _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_12__["MatCheckboxModule"],
        _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_13__["MatProgressBarModule"],
        _angular_material_sort__WEBPACK_IMPORTED_MODULE_14__["MatSortModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_15__["MatInputModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                    _drag_edit_unique_chips_drag_edit_unique_chips_component__WEBPACK_IMPORTED_MODULE_18__["DragEditUniqueChipsComponent"],
                    _music_sorter_music_sorter_component__WEBPACK_IMPORTED_MODULE_19__["MusicSorterComponent"],
                    _music_tagger_list_music_tagger_list_component__WEBPACK_IMPORTED_MODULE_20__["MusicTaggerListComponent"],
                    _music_tagging_music_tagging_component__WEBPACK_IMPORTED_MODULE_21__["MusicTaggingComponent"],
                    _popup_popup_component__WEBPACK_IMPORTED_MODULE_22__["PopupComponent"],
                    _pretty_code_pretty_code_component__WEBPACK_IMPORTED_MODULE_23__["PrettyCodeComponent"],
                    _sortable_searchable_table_sortable_searchable_table_component__WEBPACK_IMPORTED_MODULE_24__["SortableSearchableTableComponent"],
                    _anti_spam_click_directive__WEBPACK_IMPORTED_MODULE_25__["AntiSpamClickDirective"],
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                    _angular_material_chips__WEBPACK_IMPORTED_MODULE_6__["MatChipsModule"],
                    _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_16__["DragDropModule"],
                    _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__["MatIconModule"],
                    _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_0__["BrowserAnimationsModule"],
                    _angular_material_button__WEBPACK_IMPORTED_MODULE_8__["MatButtonModule"],
                    _angular_material_table__WEBPACK_IMPORTED_MODULE_9__["MatTableModule"],
                    ngx_electron__WEBPACK_IMPORTED_MODULE_17__["NgxElectronModule"],
                    _angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__["MatDialogModule"],
                    _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_11__["MatSnackBarModule"],
                    _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_12__["MatCheckboxModule"],
                    _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_13__["MatProgressBarModule"],
                    _angular_material_sort__WEBPACK_IMPORTED_MODULE_14__["MatSortModule"],
                    _angular_material_input__WEBPACK_IMPORTED_MODULE_15__["MatInputModule"],
                ],
                providers: [],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]],
            }]
    }], null, null); })();


/***/ }),

/***/ "aGi1":
/*!******************************************************!*\
  !*** ./src/app/pretty-code/pretty-code.component.ts ***!
  \******************************************************/
/*! exports provided: PrettyCodeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrettyCodeComponent", function() { return PrettyCodeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class PrettyCodeComponent {
    constructor() { }
    ngOnInit() {
    }
}
PrettyCodeComponent.ɵfac = function PrettyCodeComponent_Factory(t) { return new (t || PrettyCodeComponent)(); };
PrettyCodeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PrettyCodeComponent, selectors: [["app-pretty-code"]], decls: 2, vars: 0, template: function PrettyCodeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "pretty-code works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["pre {\r\n  outline: 1px solid #ccc;\r\n  padding: 5px;\r\n  margin: 5px;\r\n}\r\n  .string {\r\n  color: green;\r\n}\r\n  .number {\r\n  color: darkorange;\r\n}\r\n  .boolean {\r\n  color: blue;\r\n}\r\n  .null {\r\n  color: magenta;\r\n}\r\n  .key {\r\n  color: red;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcHJldHR5LWNvZGUvcHJldHR5LWNvZGUuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHVCQUF1QjtFQUN2QixZQUFZO0VBQ1osV0FBVztBQUNiO0FBQ0E7RUFDRSxZQUFZO0FBQ2Q7QUFDQTtFQUNFLGlCQUFpQjtBQUNuQjtBQUNBO0VBQ0UsV0FBVztBQUNiO0FBQ0E7RUFDRSxjQUFjO0FBQ2hCO0FBQ0E7RUFDRSxVQUFVO0FBQ1oiLCJmaWxlIjoic3JjL2FwcC9wcmV0dHktY29kZS9wcmV0dHktY29kZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOjpuZy1kZWVwIHByZSB7XHJcbiAgb3V0bGluZTogMXB4IHNvbGlkICNjY2M7XHJcbiAgcGFkZGluZzogNXB4O1xyXG4gIG1hcmdpbjogNXB4O1xyXG59XHJcbjo6bmctZGVlcCAuc3RyaW5nIHtcclxuICBjb2xvcjogZ3JlZW47XHJcbn1cclxuOjpuZy1kZWVwIC5udW1iZXIge1xyXG4gIGNvbG9yOiBkYXJrb3JhbmdlO1xyXG59XHJcbjo6bmctZGVlcCAuYm9vbGVhbiB7XHJcbiAgY29sb3I6IGJsdWU7XHJcbn1cclxuOjpuZy1kZWVwIC5udWxsIHtcclxuICBjb2xvcjogbWFnZW50YTtcclxufVxyXG46Om5nLWRlZXAgLmtleSB7XHJcbiAgY29sb3I6IHJlZDtcclxufVxyXG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PrettyCodeComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-pretty-code',
                templateUrl: './pretty-code.component.html',
                styleUrls: ['./pretty-code.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "aOXw":
/*!**********************************************!*\
  !*** ./src/app/anti-spam-click.directive.ts ***!
  \**********************************************/
/*! exports provided: AntiSpamClickDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AntiSpamClickDirective", function() { return AntiSpamClickDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");




class AntiSpamClickDirective {
    constructor() {
        this.debounceTime = 500;
        this.debounceClick = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.clicks = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    }
    ngOnInit() {
        this.subscription = this.clicks
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["throttleTime"])(this.debounceTime, undefined, {
            leading: true,
            trailing: true,
        }))
            .subscribe((e) => this.debounceClick.emit(e));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    clickEvent(event) {
        event.preventDefault();
        event.stopPropagation();
        this.clicks.next(event);
    }
}
AntiSpamClickDirective.ɵfac = function AntiSpamClickDirective_Factory(t) { return new (t || AntiSpamClickDirective)(); };
AntiSpamClickDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: AntiSpamClickDirective, selectors: [["", "appAntiSpamClick", ""]], hostBindings: function AntiSpamClickDirective_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AntiSpamClickDirective_click_HostBindingHandler($event) { return ctx.clickEvent($event); });
    } }, inputs: { debounceTime: "debounceTime" }, outputs: { debounceClick: "debounceClick" } });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AntiSpamClickDirective, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
        args: [{
                selector: '[appAntiSpamClick]',
            }]
    }], function () { return []; }, { debounceTime: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], debounceClick: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], clickEvent: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
            args: ['click', ['$event']]
        }] }); })();


/***/ }),

/***/ "hCTW":
/*!***********************************!*\
  !*** ./src/app/helper.service.ts ***!
  \***********************************/
/*! exports provided: HelperService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HelperService", function() { return HelperService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _popup_popup_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./popup/popup.component */ "GvNj");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/snack-bar */ "dNgK");





class HelperService {
    constructor(dialog, snackBar) {
        this.dialog = dialog;
        this.snackBar = snackBar;
    }
    feedback(s) {
        this.snackBar.open(s, 'Close', {
            duration: 3000,
        });
    }
    getOnlyUnique(arr) {
        return arr.filter((value, index, self) => {
            return self.indexOf(value) === index;
        });
    }
    getParsedIntSimple(x, badReturn) {
        const base = 10;
        const parsed = parseInt(x, base);
        if (isNaN(parsed)) {
            return badReturn;
        }
        return parsed;
    }
    getParsedInt(x, base, badReturn) {
        const parsed = parseInt(x, base);
        if (isNaN(parsed)) {
            return badReturn;
        }
        return parsed;
    }
    displayPopup(array) {
        const dialogRef = this.dialog.open(_popup_popup_component__WEBPACK_IMPORTED_MODULE_1__["PopupComponent"]);
        dialogRef.afterClosed().subscribe((result) => {
            this.feedback('Replied: ' + result);
        });
    }
    sortArrayByLength(arr) {
        arr.sort((a, b) => {
            // ASC  -> a.length - b.length
            // DESC -> b.length - a.length
            return a.length - b.length;
        });
    }
    getTrimmedArray(arr) {
        return arr.map((str) => str.trim());
    }
    getLowerCaseArray(arr) {
        return arr.map((str) => str.toLowerCase());
    }
    isInArray(value, array) {
        return array.indexOf(value) > -1;
    }
    getObjectFromKeys(obj, keys) {
        const ret = {};
        for (const key of keys) {
            if (obj[key]) {
                ret[key] = obj[key];
            }
        }
        return ret;
    }
    getValuesFromKeys(obj, keys) {
        const ret = [];
        for (const key of keys) {
            if (obj[key]) {
                ret.push(obj[key]);
            }
        }
        return ret;
    }
    // it's all thanks to
    // https://stackoverflow.com/questions/4810841/pretty-print-json-using-javascript
    getPrettyCode(json) {
        if (typeof json !== 'string') {
            json = JSON.stringify(json, undefined, 2);
        }
        json = json
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
            let cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                }
                else {
                    cls = 'string';
                }
            }
            else if (/true|false/.test(match)) {
                cls = 'boolean';
            }
            else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
        // add css
        // pre {outline: 1px solid #ccc; padding: 5px; margin: 5px; }
        // .string { color: green; }
        // .number { color: darkorange; }
        // .boolean { color: blue; }
        // .null { color: magenta; }
        // .key { color: red; }
    }
}
HelperService.ɵfac = function HelperService_Factory(t) { return new (t || HelperService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__["MatSnackBar"])); };
HelperService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: HelperService, factory: HelperService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HelperService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] }, { type: _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__["MatSnackBar"] }]; }, null); })();


/***/ }),

/***/ "hflD":
/*!********************************************************!*\
  !*** ./src/app/music-sorter/music-sorter.component.ts ***!
  \********************************************************/
/*! exports provided: MusicSorterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MusicSorterComponent", function() { return MusicSorterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _electron_communicator_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../electron-communicator.service */ "m1ck");
/* harmony import */ var _helper_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helper.service */ "hCTW");
/* harmony import */ var _popup_popup_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../popup/popup.service */ "UVxI");
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/sort */ "Dh3D");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _anti_spam_click_directive__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../anti-spam-click.directive */ "aOXw");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/progress-bar */ "bv9b");














function MusicSorterComponent_th_6_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "input", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function MusicSorterComponent_th_6_Template_input_ngModelChange_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6); const item_r4 = ctx.$implicit; return item_r4.search = $event; })("ngModelChange", function MusicSorterComponent_th_6_Template_input_ngModelChange_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r7.setFilter(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("placeholder", item_r4.column === "tags" ? "tag,tag" : item_r4.column);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", item_r4.search);
} }
function MusicSorterComponent_th_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("mat-sort-header", item_r8.column);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](item_r8.column);
} }
function MusicSorterComponent_tr_11_td_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r11 = ctx.$implicit;
    const song_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", song_r9.simple[item_r11.column], " ");
} }
function MusicSorterComponent_tr_11_Template(rf, ctx) { if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tr", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MusicSorterComponent_tr_11_Template_tr_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r14); const song_r9 = ctx.$implicit; const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r13.openDialog(song_r9.simple.title, song_r9.dir, song_r9.metadata); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, MusicSorterComponent_tr_11_td_1_Template, 2, 1, "td", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const song_r9 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx_r2.currentSongTitle === song_r9.simple.title ? "clickable-text selected" : "clickable-text not-selected");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r2.searchStringsArray);
} }
function MusicSorterComponent_div_30_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Loading... ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "mat-progress-bar", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", ctx_r3.progress);
} }
class MusicSorterComponent {
    constructor(communicator, helper, dialog) {
        this.communicator = communicator;
        this.helper = helper;
        this.dialog = dialog;
        this.folder = 'C:/Users';
        this.fileContains = '.mp3';
        this.folders = [];
        this.isLoading = false;
        this.progress = 0;
        this.newDir = '';
        this.lessThan = true;
        this.maxFeedbackValue = 0;
        this.searchStringsArray = [
            { column: 'title', search: '' },
            { column: 'artist', search: '' },
            { column: 'album', search: '' },
            { column: 'composer', search: '' },
            { column: 'genre', search: '' },
            { column: 'year', search: '' },
            { column: 'bpm', search: '' },
            { column: 'initialKey', search: '' },
            { column: 'tags', search: '' },
        ];
        this.subscriptions = [];
        this.musicSortables = [];
        this.filteredMusic = [];
    }
    ngOnInit() {
        this.setProgressAndFeedback(false, '', false);
        this.musicSortables = [];
        this.subscriptions = [];
        this.subscriptions.push(this.setLoadFolderListener());
        this.subscriptions.push(this.setAllMusicDataListener());
        this.subscriptions.push(this.setFeedbackListener());
        this.subscriptions.push(this.setGetFilesByTypeListener());
        this.subscriptions.push(this.setMakeDirListener());
    }
    ngOnDestroy() {
        for (const subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
    }
    makeDir() {
        const newFolder = this.getGeneratedDirectoryName();
        const options = {
            key: 'createFolder',
            where: this.folder,
            name: newFolder,
        };
        if (this.folder && this.folders && newFolder) {
            this.setProgressAndFeedback(true, 'Creating Directory...', true);
            this.communicator.sendToElectron(options);
        }
        else {
            this.feedback('Directory empty. Make.', true);
        }
    }
    copyDir() {
        this.makeDir();
    }
    copyDirectory() {
        const options = {
            key: 'copyAllFiles',
            folder: this.folder,
            name: this.getGeneratedDirectoryName(),
            folders: this.getFilteredFiles(),
        };
        if (this.folder && this.folders) {
            this.maxFeedbackValue = options.folders.length;
            this.setProgressAndFeedback(true, 'Copying Directory...', true);
            this.communicator.sendToElectron(options);
        }
        else {
            this.feedback('Directory empty. Copy.', true);
        }
    }
    getGeneratedDirectoryName() {
        const values = [];
        for (const val of this.searchStringsArray) {
            const search = val.search;
            if (search) {
                values.push(search);
            }
        }
        return values.join('-');
    }
    getFileName(n) {
        return this.communicator.getFileName(n);
    }
    openFolder() {
        const options = {
            key: 'openDirectory',
        };
        this.setProgressAndFeedback(true, 'Opening Directory...', true);
        this.communicator.sendToElectron(options);
    }
    getFilesByType() {
        const options = {
            key: 'getFilesByType',
            dir: this.folder,
            type: this.fileContains,
        };
        this.setProgressAndFeedback(true, 'Getting Files...', true);
        this.communicator.sendToElectron(options);
    }
    loadAllFiles() {
        const options = {
            key: 'getAllMusicData',
            folders: this.folders,
        };
        this.maxFeedbackValue = this.folders.length;
        this.setProgressAndFeedback(true, 'Getting Music Data...', true);
        this.communicator.sendToElectron(options);
    }
    setLoadFolderListener() {
        return this.communicator
            .listenToElectronConstantly('openDirectory')
            .subscribe((result) => {
            this.folder = result;
            this.newDir = result;
            this.musicSortables = [];
            this.filteredMusic = [];
            this.folders = [];
            this.setProgressAndFeedback(false, 'Opened Directory.', true);
            setTimeout(() => {
                this.getFilesByType();
            }, 500);
        });
    }
    setGetFilesByTypeListener() {
        return this.communicator
            .listenToElectronConstantly('getFilesByType')
            .subscribe((result) => {
            this.folders = result;
            this.setProgressAndFeedback(false, 'Received Files.', true);
            setTimeout(() => {
                this.loadAllFiles();
            }, 500);
        });
    }
    setAllMusicDataListener() {
        return this.communicator
            .listenToElectronConstantly('getAllMusicData')
            .subscribe((result) => {
            this.loadSortableObjects(result);
            this.setProgressAndFeedback(false, 'Received Data.', true);
        });
    }
    setFeedbackListener() {
        this.feedbackCounter = 0;
        return this.communicator
            .listenToElectronConstantly('getFeedback')
            .subscribe((result) => {
            this.feedbackCounter++;
            this.updateProgress(this.feedbackCounter);
            this.feedback(result, false);
        });
    }
    setMakeDirListener() {
        return this.communicator
            .listenToElectronConstantly('createFolder')
            .subscribe((result) => {
            this.copyDirectory();
            this.setProgressAndFeedback(false, result, true);
        });
    }
    setCopyAllFilesListener() {
        return this.communicator
            .listenToElectronConstantly('copyAllFiles')
            .subscribe(() => {
            this.setProgressAndFeedback(false, 'Copied Files.', true);
        });
    }
    loadSortableObjects(result) {
        for (const electronObject of result) {
            const o = this.getMusicSortableObject(electronObject);
            this.musicSortables.push(o);
            this.filteredMusic.push(o);
        }
    }
    getMusicSortableObject(o) {
        const file = o.file;
        const data = o.data;
        const emptyString = 'empty';
        const emptyNumber = 0;
        let validatedTags = emptyString;
        let validatedBpm = emptyNumber;
        if (data.comment) {
            if (data.comment.text) {
                validatedTags = data.comment.text.trim();
            }
        }
        if (data.bpm) {
            validatedBpm = this.helper.getParsedIntSimple(data.bpm.trim(), emptyNumber);
        }
        const musicObject = {
            dir: file,
            simple: {
                title: data.title ? data.title.trim() : emptyString,
                artist: data.artist ? data.artist.trim() : emptyString,
                album: data.album ? data.album.trim() : emptyString,
                composer: data.composer ? data.composer.trim() : emptyString,
                genre: data.genre ? data.genre.trim() : emptyString,
                year: data.year ? data.year.trim() : emptyString,
                bpm: validatedBpm,
                initialKey: data.initialKey ? data.initialKey.trim() : emptyString,
                tags: validatedTags,
            },
            tags: this.getTagsFromData(data),
            metadata: data,
        };
        return musicObject;
    }
    getTagsFromData(data) {
        if (data) {
            if (data.comment) {
                if (data.comment.text) {
                    return this.getCommentAsArray(data.comment.text);
                }
            }
        }
        return [];
    }
    getCommentAsArray(comment) {
        if (comment) {
            const c = comment.toString();
            const arr = c.split(',');
            if (arr) {
                const trimedArr = arr.map((str) => str.trim().toLowerCase());
                return trimedArr;
            }
        }
        return [''];
    }
    updateProgress(count) {
        const percentageProgress = (count * 100) / this.maxFeedbackValue;
        this.progress = Math.round(percentageProgress);
    }
    setProgressAndFeedback(b, s, isImportant) {
        this.isLoading = b;
        if (!b) {
            this.progress = 100;
        }
        if (b) {
            this.progress = 0;
            this.feedbackCounter = 0;
        }
        if (s) {
            this.feedback(s, isImportant);
        }
    }
    feedback(s, isImportant) {
        if (isImportant) {
            this.helper.feedback(JSON.stringify(s));
        }
        this.currentFeedback = JSON.stringify(s);
    }
    openDialog(titleIn, message, codeIn) {
        this.currentSongTitle = titleIn;
        const dialogMessage = {
            title: 'Music Data',
            list: [{ title: titleIn, content: message }],
            code: codeIn,
        };
        this.dialog.openDialog(dialogMessage).then((reply) => { });
    }
    getFilteredFiles() {
        const files = [];
        for (const val of this.filteredMusic) {
            files.push(val.dir);
        }
        return files;
    }
    setFilter() {
        this.newDir =
            this.folder + '/' + this.getGeneratedDirectoryName().split(',').join('-');
        this.filteredMusic = this.musicSortables.filter((item) => {
            for (const val of this.searchStringsArray) {
                const searchColumn = val.column;
                const b = val.search;
                if (b) {
                    const a = item.simple[searchColumn];
                    const match = this.isMatch(a, b);
                    if (searchColumn === 'tags') {
                        if (a) {
                            const tags = b.split(',');
                            for (const tag of tags) {
                                const matchTag = this.isMatch(a, tag);
                                if (!matchTag) {
                                    return false;
                                }
                            }
                        }
                    }
                    else {
                        if (!match) {
                            return false;
                        }
                    }
                }
            }
            return true;
        });
    }
    setFilterMoreThan() {
        this.lessThan = !this.lessThan;
        this.setFilter();
    }
    clearSearch() {
        for (const val of this.searchStringsArray) {
            val.search = '';
        }
        this.setFilter();
    }
    isMatch(a, b) {
        if (!isNaN(a)) {
            const bParsed = this.helper.getParsedIntSimple(b, 0);
            if (this.lessThan) {
                return a < bParsed;
            }
            else {
                return bParsed < a;
            }
        }
        return a.toLowerCase().indexOf(b + ''.toLowerCase()) > -1;
    }
    sortData(sort) {
        this.filteredMusic = this.filteredMusic.sort((a, b) => {
            const isAsc = sort.direction === 'asc';
            switch (sort.active) {
                case 'title':
                    return this.compare(a.simple.title, b.simple.title, isAsc);
                case 'artist':
                    return this.compare(a.simple.artist, b.simple.artist, isAsc);
                case 'album':
                    return this.compare(a.simple.album, b.simple.album, isAsc);
                case 'composer':
                    return this.compare(a.simple.composer, b.simple.composer, isAsc);
                case 'genre':
                    return this.compare(a.simple.genre, b.simple.genre, isAsc);
                case 'year':
                    return this.compare(a.simple.year, b.simple.year, isAsc);
                case 'bpm':
                    return this.compare(a.simple.bpm, b.simple.bpm, isAsc);
                case 'initialKey':
                    return this.compare(a.simple.initialKey, b.simple.initialKey, isAsc);
                case 'tags':
                    return this.compare(a.simple.tags, b.simple.tags, isAsc);
                default:
                    return 0;
            }
        });
    }
    compare(a, b, isAsc) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
}
MusicSorterComponent.ɵfac = function MusicSorterComponent_Factory(t) { return new (t || MusicSorterComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_electron_communicator_service__WEBPACK_IMPORTED_MODULE_1__["ElectronCommunicatorService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_helper_service__WEBPACK_IMPORTED_MODULE_2__["HelperService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_popup_popup_service__WEBPACK_IMPORTED_MODULE_3__["PopupService"])); };
MusicSorterComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: MusicSorterComponent, selectors: [["app-music-sorter"]], decls: 32, vars: 9, consts: [[1, "table-dark", "table"], ["matSort", "", 1, "table", "table-striped", "table-dark", 2, "table-layout", "fixed", 3, "matSortChange"], [1, "thead-light"], [4, "ngFor", "ngForOf"], [3, "mat-sort-header", 4, "ngFor", "ngForOf"], [3, "ngClass", "click", 4, "ngFor", "ngForOf"], [1, "footer-feedback", 2, "color", "grey"], [1, "footer"], [2, "width", "100px"], ["matInput", "", 3, "ngModel", "ngModelChange"], ["mat-fab", "", "color", "warn", "appAntiSpamClick", "", "aria-label", "Play", 3, "debounceTime", "debounceClick"], [1, "mini-button"], ["mat-mini-fab", "", "color", "accent", "aria-label", "refresh", 3, "click"], ["mat-raised-button", "", "color", "primary", "appAntiSpamClick", "", 3, "debounceClick"], [4, "ngIf"], [1, "container-fluid", 2, "height", "500px"], ["type", "text", "name", "searchString", 2, "width", "80px", 3, "placeholder", "ngModel", "ngModelChange"], [3, "mat-sort-header"], [3, "ngClass", "click"], ["class", "dont-break-out", 4, "ngFor", "ngForOf"], [1, "dont-break-out"], ["mode", "determinate", 3, "value"]], template: function MusicSorterComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "table", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("matSortChange", function MusicSorterComponent_Template_table_matSortChange_3_listener($event) { return ctx.sortData($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "thead", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, MusicSorterComponent_th_6_Template, 2, 2, "th", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "thead", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, MusicSorterComponent_th_9_Template, 3, 2, "th", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "tbody");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, MusicSorterComponent_tr_11_Template, 2, 2, "tr", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "span", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "mat-form-field", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "File Type");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "input", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function MusicSorterComponent_Template_input_ngModelChange_18_listener($event) { return ctx.fileContains = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("debounceClick", function MusicSorterComponent_Template_button_debounceClick_19_listener() { return ctx.openFolder(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "folder_open");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "button", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MusicSorterComponent_Template_button_click_23_listener() { return ctx.clearSearch(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, "clear_all");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "button", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("debounceClick", function MusicSorterComponent_Template_button_debounceClick_26_listener() { return ctx.copyDir(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, " Copy Files ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](30, MusicSorterComponent_div_30_Template, 3, 1, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](31, "div", 15);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.folder, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.searchStringsArray);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.searchStringsArray);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.filteredMusic);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" Last action: ", ctx.currentFeedback, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.fileContains);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("debounceTime", 300);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("To: ", ctx.newDir, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.isLoading);
    } }, directives: [_angular_material_sort__WEBPACK_IMPORTED_MODULE_4__["MatSort"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatFormField"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatLabel"], _angular_material_input__WEBPACK_IMPORTED_MODULE_7__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgModel"], _angular_material_button__WEBPACK_IMPORTED_MODULE_9__["MatButton"], _anti_spam_click_directive__WEBPACK_IMPORTED_MODULE_10__["AntiSpamClickDirective"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__["MatIcon"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _angular_material_sort__WEBPACK_IMPORTED_MODULE_4__["MatSortHeader"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgClass"], _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_12__["MatProgressBar"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL211c2ljLXNvcnRlci9tdXNpYy1zb3J0ZXIuY29tcG9uZW50LmNzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MusicSorterComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-music-sorter',
                templateUrl: './music-sorter.component.html',
                styleUrls: ['./music-sorter.component.css'],
            }]
    }], function () { return [{ type: _electron_communicator_service__WEBPACK_IMPORTED_MODULE_1__["ElectronCommunicatorService"] }, { type: _helper_service__WEBPACK_IMPORTED_MODULE_2__["HelperService"] }, { type: _popup_popup_service__WEBPACK_IMPORTED_MODULE_3__["PopupService"] }]; }, null); })();


/***/ }),

/***/ "iA+v":
/*!**************************************!*\
  !*** ./src/app/test-data.service.ts ***!
  \**************************************/
/*! exports provided: TestDataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TestDataService", function() { return TestDataService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class TestDataService {
    constructor() {
        this.testFolders = [
            'C:\\Users\\Ubaby\\Desktop\\Bands\\1200 Micrograms\\1200 Micrograms - Acid.mp3',
            'C:\\Users\\Ubaby\\Desktop\\Bands\\1200 Micrograms\\1200 Micrograms - Ailasco.mp3',
            'C:\\Users\\Ubaby\\Desktop\\Bands\\1200 Micrograms\\1200 Micrograms - Cosmologist.mp3',
            'C:\\Users\\Ubaby\\Desktop\\Bands\\1200 Micrograms\\1200 Micrograms - E Mc2.mp3',
            'C:\\Users\\Ubaby\\Desktop\\Bands\\1200 Micrograms\\1200 Micrograms - Extasy.mp3',
        ];
        this.testData = [
            {
                file: 'C:\\Users\\Ubaby\\Desktop\\Bands\\1200 Micrograms\\1200 Micrograms - Acid.mp3',
                data: {
                    album: '1200 Micrograms',
                    artist: '1200 Micrograms',
                    comment: { language: 'eng', shortText: '', text: '1200 Micrograms' },
                    composer: '1200 Micrograms',
                    genre: 'Trance',
                    title: 'Acid',
                    raw: {
                        TALB: '1200 Micrograms',
                        TPE1: '1200 Micrograms',
                        COMM: { language: 'eng', shortText: '', text: '1200 Micrograms' },
                        TCOM: '1200 Micrograms',
                        TCON: 'Trance',
                        TIT2: 'Acid',
                    },
                },
            },
            {
                file: 'C:\\Users\\Ubaby\\Desktop\\Bands\\1200 Micrograms\\1200 Micrograms - Ailasco.mp3',
                data: {
                    album: '1200 Micrograms',
                    artist: '1200 Micrograms',
                    comment: {
                        language: 'eng',
                        shortText: '',
                        text: 'house,dance,happy,positive',
                    },
                    composer: '1200 Micrograms',
                    genre: 'Trance',
                    title: 'Ailasco',
                    raw: {
                        TALB: '1200 Micrograms',
                        TPE1: '1200 Micrograms',
                        COMM: { language: 'eng', shortText: '', text: '1200 Micrograms' },
                        TCOM: '1200 Micrograms',
                        TCON: 'Trance',
                        TIT2: 'Ailasco',
                    },
                },
            },
        ];
    }
    getTestFolders() {
        return this.testFolders;
    }
    getTestData() {
        return this.testData;
    }
}
TestDataService.ɵfac = function TestDataService_Factory(t) { return new (t || TestDataService)(); };
TestDataService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: TestDataService, factory: TestDataService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](TestDataService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "kfHb":
/*!*************************************************!*\
  !*** ./src/app/popup/popup-messager.service.ts ***!
  \*************************************************/
/*! exports provided: PopupMessagerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopupMessagerService", function() { return PopupMessagerService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class PopupMessagerService {
    constructor() { }
    setMessage(msg) {
        this.msg = msg;
    }
    getMessage() {
        return this.msg;
    }
    getPrettyCode(json) {
        // it's all thanks to
        // https://stackoverflow.com/questions/4810841/pretty-print-json-using-javascript
        if (typeof json !== 'string') {
            json = JSON.stringify(json, undefined, 2);
        }
        json = json
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
            let cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                }
                else {
                    cls = 'string';
                }
            }
            else if (/true|false/.test(match)) {
                cls = 'boolean';
            }
            else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
        // add css
        // pre {outline: 1px solid #ccc; padding: 5px; margin: 5px; }
        // .string { color: green; }
        // .number { color: darkorange; }
        // .boolean { color: blue; }
        // .null { color: magenta; }
        // .key { color: red; }
    }
}
PopupMessagerService.ɵfac = function PopupMessagerService_Factory(t) { return new (t || PopupMessagerService)(); };
PopupMessagerService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: PopupMessagerService, factory: PopupMessagerService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PopupMessagerService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "m1ck":
/*!**************************************************!*\
  !*** ./src/app/electron-communicator.service.ts ***!
  \**************************************************/
/*! exports provided: ElectronCommunicatorService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ElectronCommunicatorService", function() { return ElectronCommunicatorService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _helper_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helper.service */ "hCTW");
/* harmony import */ var _test_data_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./test-data.service */ "iA+v");





// const ipc = (window as any).require('electron').ipcRenderer;
class ElectronCommunicatorService {
    constructor(zone, helper, t) {
        this.zone = zone;
        this.helper = helper;
        this.t = t;
        this.messages = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"]('');
        this.directory = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"]('');
        if (window.require) {
            try {
                this.ipc = window.require('electron').ipcRenderer;
            }
            catch (error) {
                console.log(error);
            }
        }
        else {
            console.log('Could not load electron ipc');
        }
    }
    sendToElectron(options) {
        if (this.ipc) {
            this.sendElectron(options);
        }
        else {
            // this.sendAngular(key, options);
        }
    }
    // sendToElectron(key: string, parameters: any[]): void {
    //   if (this.ipc) {
    //     this.sendElectron(key, parameters);
    //   } else {
    //     this.sendAngular(key, parameters);
    //   }
    // }
    listenToElectronConstantly(key) {
        if (this.ipc) {
            return this.listenElectron(key);
        }
        else {
            return this.listenAngular(key);
        }
    }
    sendElectron(options) {
        this.ipc.send('requestFromRenderer', options);
    }
    // sendElectron(key: string, options: {}): void {
    //   this.ipc.send(key, options);
    // }
    sendAngular(key, parameters) {
        console.log('sending to electron: ' + key);
    }
    listenElectron(key) {
        const observable = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Observable"]((subscriber) => {
            try {
                this.ipc.on(key, (event, arg) => {
                    this.zone.run(() => {
                        subscriber.next(arg);
                        // subscriber.complete(); if you want to stop from listening next values
                    });
                });
            }
            catch (error) {
                this.feedback('Electron Communicator Error: ' + error);
                subscriber.next('listenToElectronConstantly Error: ' + key);
                subscriber.complete();
            }
        });
        return observable;
    }
    listenAngular(key) {
        const observable = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Observable"]((subscriber) => {
            try {
                switch (key) {
                    case 'openDirectory':
                        subscriber.next('C:/Users');
                        break;
                    case 'getFilesByType':
                        subscriber.next(this.t.getTestFolders());
                        break;
                    case 'getAllMusicData':
                        subscriber.next(this.t.getTestData());
                        break;
                    case 'getMusicData':
                        subscriber.next(this.t.getTestData()[0].data);
                        break;
                    default:
                        break;
                }
            }
            catch (error) {
                this.feedback('Electron Communicator Error: ' + error);
                subscriber.next('listenToElectronConstantly Error: ' + key);
                subscriber.complete();
            }
        });
        return observable;
    }
    getFileName(dir) {
        if (dir) {
            return dir.replace(/^.*[\\\/]/, '');
        }
        return dir;
    }
    feedback(s) {
        this.helper.feedback(s);
    }
}
ElectronCommunicatorService.ɵfac = function ElectronCommunicatorService_Factory(t) { return new (t || ElectronCommunicatorService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_helper_service__WEBPACK_IMPORTED_MODULE_2__["HelperService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_test_data_service__WEBPACK_IMPORTED_MODULE_3__["TestDataService"])); };
ElectronCommunicatorService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ElectronCommunicatorService, factory: ElectronCommunicatorService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ElectronCommunicatorService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"] }, { type: _helper_service__WEBPACK_IMPORTED_MODULE_2__["HelperService"] }, { type: _test_data_service__WEBPACK_IMPORTED_MODULE_3__["TestDataService"] }]; }, null); })();


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _music_sorter_music_sorter_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./music-sorter/music-sorter.component */ "hflD");
/* harmony import */ var _music_tagger_list_music_tagger_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./music-tagger-list/music-tagger-list.component */ "QIEW");






const routes = [
    { path: '', redirectTo: '/music-sorter', pathMatch: 'full' },
    {
        path: 'music-tagger',
        component: _music_tagger_list_music_tagger_list_component__WEBPACK_IMPORTED_MODULE_3__["MusicTaggerListComponent"],
    },
    {
        path: 'music-sorter',
        component: _music_sorter_music_sorter_component__WEBPACK_IMPORTED_MODULE_2__["MusicSorterComponent"],
    },
];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
            }]
    }], null, null); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "AytR");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map
// angular imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

// material imports
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';

// other angular
import { DragDropModule } from '@angular/cdk/drag-drop';

// other
import { NgxElectronModule } from 'ngx-electron';

// components and services
import { DragEditUniqueChipsComponent } from './drag-edit-unique-chips/drag-edit-unique-chips.component';
import { MusicSorterComponent } from './music-sorter/music-sorter.component';
import { MusicTaggerListComponent } from './music-tagger-list/music-tagger-list.component';
import { MusicTaggingComponent } from './music-tagging/music-tagging.component';
import { PopupComponent } from './popup/popup.component';
import { PrettyCodeComponent } from './pretty-code/pretty-code.component';
import { SortableSearchableTableComponent } from './sortable-searchable-table/sortable-searchable-table.component';
import { AntiSpamClickDirective } from './anti-spam-click.directive';
import { TaggingFromFileComponent } from './tagging-from-file/tagging-from-file.component';
import { TagStepperComponent } from './tag-stepper/tag-stepper.component';
import { SuggestionManagerComponent } from './suggestion-manager/suggestion-manager.component';
import { SuggestionFilterComponent } from './suggestion-filter/suggestion-filter.component';
import { MatrixStepperComponent } from './matrix-stepper/matrix-stepper.component';
import { MatrixJsonComponent } from './matrix-json/matrix-json.component';
import { FileMenuComponent } from './file-menu/file-menu.component';
import { ProgressComponent } from './progress/progress.component';

@NgModule({
  declarations: [
    AppComponent,
    DragEditUniqueChipsComponent,
    MusicSorterComponent,
    MusicTaggerListComponent,
    MusicTaggingComponent,
    PopupComponent,
    PrettyCodeComponent,
    SortableSearchableTableComponent,
    AntiSpamClickDirective,
    TaggingFromFileComponent,
    TagStepperComponent,
    SuggestionManagerComponent,
    SuggestionFilterComponent,
    MatrixStepperComponent,
    MatrixJsonComponent,
    FileMenuComponent,
    ProgressComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatChipsModule,
    DragDropModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    NgxElectronModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatSortModule,
    MatInputModule,
    MatTabsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

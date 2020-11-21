import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { DragEditUniqueChipsComponent } from './drag-edit-unique-chips/drag-edit-unique-chips.component';
import { MusicSorterComponent } from './music-sorter/music-sorter.component';
import { MusicTaggerListComponent } from './music-tagger-list/music-tagger-list.component';
import { MusicTaggingComponent } from './music-tagging/music-tagging.component';
import { PopupComponent } from './popup/popup.component';
import { PrettyCodeComponent } from './pretty-code/pretty-code.component';
import { SortableSearchableTableComponent } from './sortable-searchable-table/sortable-searchable-table.component';

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
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

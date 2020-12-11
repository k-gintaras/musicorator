import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilteringComponent } from './filtering/filtering.component';
import { MusicSorterComponent } from './music-sorter/music-sorter.component';
import { MusicTaggerListComponent } from './music-tagger-list/music-tagger-list.component';
import { SuggestionFilterComponent } from './suggestion-filter/suggestion-filter.component';
import { SuggestionManagerComponent } from './suggestion-manager/suggestion-manager.component';
import { SuggestionsComponent } from './suggestions/suggestions.component';
import { TagAudioComponent } from './tag-audio/tag-audio.component';
import { TaggingFromFileComponent } from './tagging-from-file/tagging-from-file.component';

const routes: Routes = [
  { path: '', redirectTo: '/filtering', pathMatch: 'full' },
  {
    path: 'music-tagger',
    component: MusicTaggerListComponent,
  },
  {
    path: 'music-sorter',
    component: MusicSorterComponent,
  },
  {
    path: 'music-tagger-file',
    component: TaggingFromFileComponent,
  },
  {
    path: 'suggestions-manager',
    component: SuggestionManagerComponent,
  },
  {
    path: 'suggestion-filter',
    component: SuggestionFilterComponent,
  },
  {
    path: 'tag-audio',
    component: TagAudioComponent,
  },
  {
    path: 'suggestions',
    component: SuggestionsComponent,
  },
  {
    path: 'filtering',
    component: FilteringComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MusicSorterComponent } from './music-sorter/music-sorter.component';
import { MusicTaggerListComponent } from './music-tagger-list/music-tagger-list.component';
import { SuggestionManagerComponent } from './suggestion-manager/suggestion-manager.component';
import { TaggingFromFileComponent } from './tagging-from-file/tagging-from-file.component';

const routes: Routes = [
  { path: '', redirectTo: '/suggestions-manager', pathMatch: 'full' },
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

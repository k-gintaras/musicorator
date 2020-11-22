import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MusicSorterComponent } from './music-sorter/music-sorter.component';
import { MusicTaggerListComponent } from './music-tagger-list/music-tagger-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/music-sorter', pathMatch: 'full' },
  {
    path: 'music-tagger',
    component: MusicTaggerListComponent,
  },
  {
    path: 'music-sorter',
    component: MusicSorterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

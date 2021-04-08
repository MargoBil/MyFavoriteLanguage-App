import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VocabularyComponent } from './vocabulary.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { WordListComponent } from './word-list/word-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [VocabularyComponent, WordListComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    MatChipsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [VocabularyComponent],
})
export class VocabularyModule {}

import {Component, OnInit, ViewChild} from '@angular/core';
import {DictionaryService} from './dictionary.service';
// import {ModalDirective} from 'ng-uikit-pro-standard'; // package under license , can't be published on public , check mdb for more details
import {Dictionary} from './dictionary';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss']
})
export class DictionaryComponent implements OnInit {
  dictionaries = [];
  selectedDictionary: any;
  @ViewChild('editModal') editModal: ModalDirective;
  @ViewChild('deleteModal') deleteModal: ModalDirective;
  @ViewChild('addDictionaryModal') addDictionaryModal: ModalDirective;
  addDictionaryIsShown = false;
  dictionary = new Dictionary();
  errorMessage: string;
  duplicateError = false;
  forksError = false;
  cyclesError = false;
  chainsError = false;
  wrongDictionaries = [];
  addDictionaryErrorMessage: string;
  newDictionaires = [];

  constructor(private dictionaryService: DictionaryService) { }

  ngOnInit() {
  this.dictionaryService.getDictionaries().subscribe(result => {
    console.log(result);
    this.dictionaries = result;
  });

  }

  showEditModal(dictionary: any) {
    this.selectedDictionary = dictionary;
    console.log(this.selectedDictionary.column);
    this.editModal.show();
  }

  updateDictionary() {
    this.duplicateError = false;
    this.forksError = false;
    this.cyclesError = false;
    this.chainsError = false;
    this.newDictionaires = [];
    this.newDictionaires = this.dictionaries.filter((row) => {
      return row.id !== this.selectedDictionary.id;
    });
    this.validateDictionary(this.selectedDictionary, this.newDictionaires);
    this.editModal.hide();
  }

  saveEdit() {
    this.dictionaryService.saveEdit(this.selectedDictionary).subscribe(result => {});
    this.editModal.hide();
  }

  showDeleteModal(dictionary: any) {
    this.selectedDictionary = dictionary;
    this.deleteModal.show();
  }

  deleteDictionary() {
    this.dictionaryService.delete(this.selectedDictionary).subscribe(result => {
      this.dictionaryService.getDictionaries().subscribe(res => {
        this.dictionaries = res;
      });
      this.deleteModal.hide();
      this.duplicateError = false;
      this.forksError = false;
      this.cyclesError = false;
      this.chainsError = false;
    });

  }

  display() {
    this.addDictionaryIsShown = !this.addDictionaryIsShown;
  }

  addDictionary() {
    console.log('>>addDictionary');
    this.duplicateError = false;
    this.forksError = false;
    this.cyclesError = false;
    this.chainsError = false;

    if (this.dictionary.column === undefined || this.dictionary.domain === undefined || this.dictionary.range === undefined) {
      console.log('empty');
      this.addDictionaryErrorMessage = 'Please Fill the empty field';
      this.addDictionaryModal.show();
    } else {
      this.validateDictionary(this.dictionary, this.dictionaries);

    }
  }

  saveDictionary(dictionary) {
    this.dictionaryService.saveEdit(dictionary).subscribe((result) => {});
    this.dictionaryService.getDictionaries().subscribe(result => {
      this.dictionaries = result;
    });
    this.dictionary = new Dictionary();
    this.selectedDictionary = new Dictionary();
    this.addDictionaryIsShown = false;
  }

  validateDictionary(dictionary: any , dictionaries: any) {
    // check duplicates
    this.wrongDictionaries = dictionaries.filter((row: any) => {
      return dictionary.domain === row.domain && dictionary.range === row.range;
    });
    if (this.wrongDictionaries.length > 0) {
      this.duplicateError = true;
      this.errorMessage = 'Duplicates Error : Duplicate Domain - Range pairs !';
      // dictionary = new Dictionary();
      dictionary.status = 'Duplicates Error';
      this.saveDictionary(dictionary);
      return;
    } else {
    // check forks
    this.wrongDictionaries = dictionaries.filter((row: any) => {
      return dictionary.domain === row.domain && dictionary.range !== row.range;
    });
    if (this.wrongDictionaries.length > 0) {
      this.forksError = true;
      this.errorMessage = 'Forks Error : Duplicate Domains with different Ranges !';
      // dictionary = new Dictionary();
      dictionary.status = 'Forks Error';
      this.saveDictionary(dictionary);
      return;
    } else {

      // check Cycles
      this.wrongDictionaries = dictionaries.filter((row: any) => {
        return dictionary.domain === row.range && dictionary.range === row.domain;
      });
      if (this.wrongDictionaries.length > 0) {
        this.cyclesError = true;
        this.errorMessage = 'Cycles Error : Two or more rows in a dictionary result in cycles !';
        // dictionary = new Dictionary();
        dictionary.status = 'Cycles Error';
        this.saveDictionary(dictionary);
        return;
      } else {

        // check Chains
        this.wrongDictionaries = dictionaries.filter((row: any) => {
          return dictionary.domain === row.range && dictionary.range !== row.domain;
        });
        if (this.wrongDictionaries.length > 0) {
          this.chainsError = true;
          this.errorMessage = 'Chains Error ! A chain structure in the dictionary  !';
          // dictionary = new Dictionary();
          dictionary.status = 'Chains Error';
          this.saveDictionary(dictionary);
          return;
        } else {
          this.dictionary.status = 'Validated';
          this.saveDictionary(dictionary);
        }
      }
    }
  }
  }

}

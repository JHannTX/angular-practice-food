import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ParamsService } from 'src/app/services/utility/params.service';

@Component({
  selector: 'fd-fruit-search',
  templateUrl: './fruit-search.component.html',
  styleUrls: ['./fruit-search.component.css']
})
export class FruitSearchComponent {
  @Output() search = new EventEmitter();

  form!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private paramsService: ParamsService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    let term: string = this.paramsService.getFruitSearch();

    this.form = this.formBuilder.group({
      term: this.formBuilder.control(term, {nonNullable: true})
    });
  }

  onSubmit(term: SearchTerm) {
    this.search.emit(term.term);

    this.router.navigate(['.'], {
      relativeTo: this.activatedRoute,
      queryParams: {
        term: term.term
      }
    });
  }
}

interface SearchTerm {
  term: string
}

import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  contactForm: FormGroup = new FormGroup({
    'name': new FormControl(null),
    'email': new FormControl(null),
    'url': new FormControl(null),
    'description': new FormControl(null)
  });

  constructor(private formBuilder: FormBuilder) { }
  
  onSubmit() {
    this.contactForm.reset();
  }

}

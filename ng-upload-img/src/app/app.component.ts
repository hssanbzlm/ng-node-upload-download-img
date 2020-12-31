import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { User } from './models/user';
import { UploadService } from './shared/services/upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ng-upload-img';
  registerForm: FormGroup;
  selectedFile: File = null;
  img: SafeResourceUrl;

  constructor(
    private fb: FormBuilder,
    private service: UploadService,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      filess: ['', Validators.required],
    });
  }

  onFileChange(event) {
    this.selectedFile = event.target.files[0];
  }

  submit() {
    const fd = new FormData();
    fd.append('avatar', this.selectedFile);
    this.service.upload('1', fd).subscribe((v) => {
      console.log(fd);
      console.log(v);
    });
  }

  getImg() {
    this.service.download('1').subscribe((data) => {
      this.img = this.sanitizer.bypassSecurityTrustUrl(
        'data:image/jpeg;base64,' + data.img
      );
    });
  }
}

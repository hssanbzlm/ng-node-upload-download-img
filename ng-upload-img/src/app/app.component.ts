import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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
  startPorgress: boolean;
  uploaded: boolean;
  img: SafeResourceUrl;
  value: number;
  color: string;
  mode: string = 'Determinate';

  constructor(
    private fb: FormBuilder,
    private service: UploadService,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    //we suppose the file is a part of a form
    this.registerForm = this.fb.group({
      filess: ['', Validators.required],
    });
  }
  initializeProgressBar() {
    this.color = 'warn';
    this.value = 0;
    this.startPorgress = false;
    this.uploaded = false;
  }
  onFileChange(event) {
    this.selectedFile = event.target.files[0];
  }

  submit() {
    this.initializeProgressBar();
    const fd = new FormData();
    fd.append('avatar', this.selectedFile, this.selectedFile.name);

    this.service
      .upload('1', fd, { reportProgress: true, observe: 'events' })
      .subscribe((data) => {
        this.startPorgress = true;
        if (data['type'] === HttpEventType.UploadProgress) {
          this.value = Math.round((data['loaded'] / data['total']) * 100);
          console.log(Math.round((data['loaded'] / data['total']) * 100));
        } else if (data['type'] === HttpEventType.Response) {
          console.log(data);
          this.color = 'primary';
          this.uploaded = true;
        }
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

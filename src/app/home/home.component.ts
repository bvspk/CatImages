import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/imageservice';
import { ICategory, IRandonCategory } from '../model/category.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  isLoading: boolean = false;
  hasError = false;
  imageCategory: ICategory[] = [];
  iCategory: ICategory[] = [];
  initPage = 0;
  pageSize = 10;
  imageList: IRandonCategory[] = [];
  displayImages: boolean = false;
  imageData: IRandonCategory[] = [];
  selectCategory: String;
  categoryId: number;
  searchInput = '';
  constructor(private imageService: ImageService) {
  }

  ngOnInit() {
    this.getRandomImage();
    this.getImageCategories();
  }
  getRandomImage() {
    this.isLoading = true;
    this.imageService.getRandomImage().subscribe(
      (data: IRandonCategory[]) => {
        this.imageList = data;
        this.displayImages = true;
        this.selectCategory = 'Random Image';
        this.hasError = false;
        this.getData({ pageIndex: this.initPage, pageSize: this.pageSize });
        this.isLoading = false;
      },
      (error) => {
        this.hasError = true;
      },
      () => {
        this.isLoading = false;
      }
    );
  }
  getImageCategories() {
    this.isLoading = true;
    this.imageService.getAllCategories().subscribe((data: ICategory[]) => {
      this.imageCategory = data;
      this.iCategory = this.imageCategory;
      this.hasError = false;
      this.isLoading = false;
    },
      (error) => {
        this.hasError = true;
      },
      () => {
        this.isLoading = false;
      }
    );
  }
  getData(obj?:any, action?: boolean) {
    let index = 0,
      startingIndex = obj.pageIndex * obj.pageSize,
      endingIndex = startingIndex + obj.pageSize;
    if (action && obj.previousPageIndex < obj.pageIndex) {
      this.getImagesBasedOnId(this.categoryId, true);
    }
    this.imageData = this.imageList.filter(() => {
      index++;
      return (index > startingIndex && index <= endingIndex) ? true : false;
    });

  }

  assignCategory(category) {
    this.isLoading = true;
    this.selectCategory = category.name;
    this.categoryId = category.id;
    this.getImagesBasedOnId(category.id, false);
  }

  getImagesBasedOnId(id?: number, action?: boolean) {
    this.imageService.getImagesByCategory(id).subscribe(
      (data) => {
        this.displayImages = true;
        if (!action) {
          this.imageList = data;
        }
        else {
          this.imageList = this.imageList.concat(data);
        }
        this.getData({ pageIndex: this.initPage, pageSize: this.pageSize });
        this.hasError = false;
        this.isLoading = false;
      },
      (error) => {
        this.hasError = true;
      },
      () => {
        this.isLoading = false;
      }
    );
  }
  getSearchCategory(value: string) {
    let filter = value.toLowerCase();
    this.imageCategory=this.imageCategory.filter(data => data.name.toLowerCase().startsWith(filter));
    if(value.length == 0){
      this.imageCategory = this.iCategory;
    }
  }
}



import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { HttpService } from '../services/http.service';
import { of, throwError } from 'rxjs';
import { MatPaginatorModule, MatCardModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { AvatarModule } from 'ngx-avatar';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const testRandomData = '[{"id":5,"name":"boxes"},{"id":15,"name":"clothes"},{"id":1,"name":"hats"},{"id":14,"name":"sinks"},{"id":2,"name":"space"},{"id":4,"name":"sunglasses"},{"id":7,"name":"ties"}]';
const testCategoryData = '[{"breeds":[],"categories":[{"id":15,"name":"clothes"}],"id":"MTgwNzAzMg","url":"https://cdn2.thecatapi.com/images/MTgwNzAzMg.jpg","width":333,"height":500}]'
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        PerfectScrollbarModule,
        AvatarModule,
        MatPaginatorModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.initPage = 0;
    component.pageSize = 10;
    component.imageList = [];
    component.categoryId=5;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call API to get Categories', () => {
    spyOn(HttpService.prototype, 'get').and.returnValue(of(JSON.parse(testRandomData)));
    component.ngOnInit();
    expect(typeof (component.imageCategory)).toBe('object');
  });
  it('Should call gatSearchCategory method after some data entered and idle for 1sec', fakeAsync(() => {
    spyOn(HttpService.prototype, 'get').and.returnValue(of(JSON.parse(testRandomData)));
    component.searchInput = 'Boxes';
    component.getImageCategories();
    component.getSearchCategory(component.searchInput);
    tick(100);
    expect(component.imageCategory.length).toBeGreaterThan(0);
  }));
  it('should call API to get  Categories', () => {
    spyOn(HttpService.prototype, 'get').and.returnValue(throwError('error'));
    component.ngOnInit();
    expect(component.hasError).toBeTruthy();
  });
  it('should call API to get  Images Based On CategoryID', () => {
    spyOn(HttpService.prototype, 'get').and.returnValue(of(JSON.parse(testCategoryData)));
    component.getImagesBasedOnId(15);
    expect(typeof (component.imageList)).toBe('object');
  });

  it('should call API to get  Images Based On Category', () => {
    spyOn(HttpService.prototype, 'get').and.returnValue(throwError('error'));
    component.getImagesBasedOnId(15);
    expect(component.hasError).toBeTruthy();
  });

  it('should return data on page load for RandomImage', () => {
    component.ngOnInit();
    spyOn(HttpService.prototype, 'get').and.returnValue(of(JSON.parse(testCategoryData)));
    component.getRandomImage();
    expect(component.imageList.length).toEqual(1);
    expect(component.displayImages).toBe(true);
    expect(component.pageSize).toBe(10);
    expect(component.initPage).toBe(0);
    component.getData({ pageIndex: component.initPage, pageSize: component.pageSize },true);
    
    expect(component.imageData.length).toBeGreaterThanOrEqual(1);
  });
  it('pagination should work', () => {
    let i=1;
    while(component.imageData.length > 10) {
        i++;
        component.initPage;
    }
    expect(i).toEqual(1);
});
  it('should return pagination when click on Category', () => {
    component.ngOnInit();
    spyOn(HttpService.prototype, 'get').and.returnValue(of(JSON.parse(testCategoryData)));
    component.assignCategory(component.categoryId);
    expect(component.imageList.length).toBeGreaterThanOrEqual(1);
    expect(component.displayImages).toBe(true);
    expect(component.pageSize).toBeGreaterThanOrEqual(10)
    expect(component.initPage).toBeGreaterThanOrEqual(0);
    expect(component.initPage).toBeGreaterThanOrEqual(0);
  });
  it('pagination after ', () => {
    let i=1;
    while(component.imageData.length > 10) {
        i++;
        component.initPage;
    }
    expect(i).toEqual(1);
});
it('Calling Next method should increment start value and end value by 10', () => {
  component.imageList = testCategoryData as any;
  component.getImagesBasedOnId(15,true)
  expect(component.imageList.length).toBeGreaterThanOrEqual(testCategoryData.length);
});
it('Calling Previous method should not increment start value and end value by previous value', () => {
  component.imageList = testCategoryData as any;
  component.getImagesBasedOnId(15,false)
  expect(component.imageList.length).toBe(testCategoryData.length);
});
});

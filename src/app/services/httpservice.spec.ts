import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';

describe('HttpService', () => {
  let service: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [HttpClient]
    });
    service = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return data', async(() => {
    service.get('https://api.thecatapi.com/v1/images/search').subscribe(
      (data) => {
        expect(typeof(data)).toEqual('object');
      }
    );
  }));
  it('should return data', async(() => {
    service.get(' https://api.thecatapi.com/v1/categories').subscribe(
      (data) => {
        expect(typeof(data)).toEqual('object');
      }
    );
  }));
})

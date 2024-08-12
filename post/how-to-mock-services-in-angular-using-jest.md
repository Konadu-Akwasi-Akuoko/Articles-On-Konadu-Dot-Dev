# How To Mock Services In Angular Using Jest

Published on August 12, 2024

![how to mock services in angular using jest](https://cdn.sanity.io/images/ok7qsbpm/production/9728cccf2d9c004a8b90a65cc9c478e9325ecb7b-1692x1024.png?q=75&fit=clip&auto=format&fm=webp)

For quite some time now I've been using Jest as a my testing library in Angular instead of the jasmine/karma duo. Writing a unit test for a service with  jasmin/karma is easy as documented in the [Angular docs](https://angular.dev/guide/testing/components-scenarios#testing-with-a-spy)(**subjective claim**😂).

But when it comes to jest, there was little to no available information online, but with some research, this is what I came up with:

```undefined
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { homeRoutes } from '../../home.routes';
import { AuthService } from '@app/pages/auth/services/auth/auth.service';

describe('HomeComponent', () => {
	let component: HomeComponent;
	let fixture: ComponentFixture<HomeComponent>;
    // Create your authService
	let authService: AuthService;
    // Declare the type of all the methods you need to mock, over here we are doing just one
	let authServiceMock: { isLoggedIn: jest.Mock };

	beforeEach(async () => {
		// Create a mock object for AuthService with a mocked isLoggedIn method, remember the one we declared it's type on top
		authServiceMock = {
			isLoggedIn: jest.fn(), // jest.fn() creates a mock function for isLoggedIn
		};
		await TestBed.configureTestingModule({
			imports: [HomeComponent, HttpClientTestingModule],
			providers: [
				provideRouter(homeRoutes),
				// Provide the mock AuthService instead of the real one
				{ provide: AuthService, useValue: authServiceMock },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(HomeComponent);
		component = fixture.componentInstance;
        // Inject the service into the TestBed
		authService = TestBed.inject(AuthService);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have a falsy value for isLoggedIn', () => {
		// Mock the return value of isLoggedIn to be false
		authServiceMock.isLoggedIn.mockReturnValue(false);
		// Check if the mocked isLoggedIn method returns false
		expect(authService.isLoggedIn()).toStrictEqual(false);
	});
});

```

That is it, we are done, just like that. Thanks to Henrique for showing me how it's done, check his article [here](https://www.henriquecustodia.dev/posts/how-to-mock-an-angular-service-with-jest/).

Hey 👋, I believe you enjoyed this shortie (it serves as a note to my future self 😎) and learned something new and valuable. Learn more about [OOP Classes here](https://konadu.devintroduction-to-oop-classes). 

You can also follow me on Twitter (https://twitter.com/akuoko_konadu) (or instead X 😂) as I share more tips and tricks to make you improve as a better software engineer.

Until then, happy coding!
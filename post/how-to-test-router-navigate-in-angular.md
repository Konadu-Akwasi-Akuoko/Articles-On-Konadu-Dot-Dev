# How To Test Router.navigate In Angular

Published on August 12, 2024

![how to test router.navigate in angular](https://cdn.sanity.io/images/ok7qsbpm/production/dd03f454bc66d2079817835d41b1056cfe96d96e-1692x1024.jpg?q=75&fit=clip&auto=format&fm=webp)

When it comes to Angular routing, we mostly inject the `Router` into our application, and use the [`router.navigate`](https://angular.dev/api/router/Router#navigate) method to navigate programmatically between our pages.

Sometimes it can be fun when we do that, especially when you are doing a whole lot of logic before navigating your user.

But the problem arises when we need to write test for the `Router.navigate` function, I found a way that works quite well, check it out below.

For clarity, we are trying to test a code that looks like the below:

```undefined
@Component({
	selector: 'app-home',
	standalone: true,
	imports: [],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
	private _router = inject(Router);

	ngOnInit(): void {
      this._router.navigate(['/']);
	}
}
```

Now let's write the test:

```undefined
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideRouter, Router } from '@angular/router';
import { homeRoutes } from '../../home.routes';

describe('HomeComponent', () => {
	let component: HomeComponent;
	let fixture: ComponentFixture<HomeComponent>;
	let router: Router;

	beforeEach(async () => {

		await TestBed.configureTestingModule({
			imports: [HomeComponent, HttpClientTestingModule],
			providers: [
				provideRouter(homeRoutes),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(HomeComponent);
		component = fixture.componentInstance;
        // Inject the Router into the TestBed
		router = TestBed.inject(Router);
		fixture.detectChanges();
	});

	it('should take the user to the home route when not logged in', () => {
		// Run the test within Angular's NgZone to handle asynchronous operations, including router.navigate
		fixture.ngZone?.run(() => {
			// Spy on the navigate method of the Router
			const routerSpy = jest.spyOn(router, 'navigate');

			// Call ngOnInit to trigger the component's initialization logic
			component.ngOnInit();

			// Check if the navigate method was called with the home route
			expect(routerSpy).toHaveBeenCalledWith(['/']);
		});
	});
});

```

That is it, we are done, just like that.

Hey 👋, I believe you enjoyed this shortie (it serves as a note to my future self 😎) and learned something new and valuable. Learn about how to [mock methods in services with jest here.](https://konadu.devhow-to-mock-services-in-angular-using-jest)

You can also follow me on [Twitter (or instead X 😂)](https://twitter.com/akuoko_konadu) as I share more tips and tricks to make you improve as a better software engineer.

Until then, happy coding!
# How To Test injectQuery, Angular TanStack Query

Published on August 12, 2024

![how to test injectQuery, Angular Tanstack query](https://cdn.sanity.io/images/ok7qsbpm/production/f69ea5e5dd61eac31fa2f10e28e5faf1d17cc93d-1692x1024.jpg?q=75&fit=clip&auto=format&fm=webp)

Last time we talked about how to test the [Router.navigate](https://konadu.devhow-to-test-router-navigate-in-angular) method in Angular, for today let's talk about testing Tanstack query.

As Angular developers, we also got access to [Tanstack query](https://tanstack.com/query/latest/docs/framework/angular/overview) not long ago. And it has been a blast working with it, with all the automatic data caching and data invalidation, it's a nice library.

But the problem arises when we are trying to test some methods from [Tanstack query for angular](https://tanstack.com/query/latest/docs/framework/angular/overview).

I tried writing tests for the `[injectQuer](https://tanstack.com/query/latest/docs/framework/angular/guides/queries)y` method, but because it is a relatively new framework to the Angular world, finding resources around it that I can use to test the API proved futile.

So for now I am stuck with testing that if a call is being made to some URL. If it pass, then it clearly means that Tanstack query's [`injectQuery`, ](https://tanstack.com/query/latest/docs/framework/angular/guides/queries)is running as it should.

I would admit it, this is not the best way to test the `injectQuery` method, because if you are doing some computations (skirmishes you know what I mean 😂), inline inside the `queryFn`  it becomes hard to test it. Unless you move the `queryFn` outside of the `injectQuery` and test that as a standalone function.

But for now this is how I am test the `injectQuery` method, with an inline `queryFn`:

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
	public completedProjects = signal<number>(0);
	public listOfProjects = signal<IHomePageProject[]>([]);

	private _homepageService = inject(HomepageService);
  
	projects = injectQuery(() => ({
		queryKey: homepageKeys.projects(),
		queryFn: async () => {
			const projects = await lastValueFrom<IHomePageProjects>(
				this._homepageService.getAllProjects()
			);

			this.completedProjects.set(projects.completedProjects);
			this.listOfProjects.set(projects.listOfProjects);

			return projects;
		},
	}));
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
    // Initialize an httpTestingController variable
  	let httpTestingController: HttpTestingController;

	beforeEach(async () => {

		await TestBed.configureTestingModule({
			imports: [HomeComponent, HttpClientTestingModule],
			providers: [
				provideRouter(homeRoutes),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(HomeComponent);
		component = fixture.componentInstance;
        // Inject the HttpTestingController, into the testing bed
		httpTestingController = TestBed.inject(HttpTestingController);
		fixture.detectChanges();
	});

	it('should fetch the list of completed projects', async () => {
		// Expect the GET request to happen, if it hapens and it mathces the given criteria, the expectOne will pass
		const req = httpTestingController.expectOne({
			method: 'GET',
			url: `${environment.BACKEND_API_BASE_URL}/homepage`,
		});

		// Provide the mock response
		req.flush(mockHomePageProjects);

		// Verify that there are no outstanding requests
		httpTestingController.verify();
	});  
});

```

That is it, we are done. I know this is not much, but for now this is what I am doing to test my `injectQuery` method in Tansktack Query Angular.

Hey 👋, I believe you enjoyed this shortie (it serves as a note to my future self 😎) and learned something new and valuable. Learn about how to [mock methods in services with jest here.](https://konadu.devhow-to-mock-services-in-angular-using-jest)

You can also follow me on [Twitter (or instead X 😂)](https://twitter.com/akuoko_konadu) as I share more tips and tricks to make you improve as a better software engineer.

Until then, happy coding!
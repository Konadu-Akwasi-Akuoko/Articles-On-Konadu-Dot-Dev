# How To Test ActivatedRoute paramMap in Angular

Published on August 13, 2024

![How To Test ActivatedRoute paramMap in Angular](https://cdn.sanity.io/images/ok7qsbpm/production/ac59735d8902729d518ecb06b962f8f9cb0bdb24-1692x1026.jpg?q=75&fit=clip&auto=format&fm=webp)

Last time we talked about [`how to fix this classic error: NullInjectorError: No provider for ActivatedRoute.`](https://konadu.devhow-to-fix-no-provider-for-activated-route-in-angular-testing) We are still in `ActivatedRoute` land, and today we are talking about how we can test the `paramMap` method which is a method of `ActivatedRoute.`

For context this is the code we are trying to test:

```undefined
@Component({
	selector: 'app-payment-option',
	standalone: true,
	imports: [],
	templateUrl: './payment-option.component.html',
	styleUrl: './payment-option.component.scss',
})
export class PaymentOptionComponent implements OnInit {
	private _activatedRoute = inject(ActivatedRoute);
  
	ngOnInit(): void {
		this._activatedRoute.paramMap.subscribe((params) => {
			const id = params.get('id');
			if (id) {
				this.projectId.set(Number(id));
			}
		});
	}
}

```

Then let's write our test:

```undefined
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentOptionComponent } from './payment-option.component';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { homeRoutes } from '../../home.routes';
import { of } from 'rxjs';

describe('PaymentOptionComponent', () => {
	let component: PaymentOptionComponent;
	let fixture: ComponentFixture<PaymentOptionComponent>;

	beforeEach(async () => {
		// We would not compile our component and detect changes as we normally do in the beforeEach, because we would override it in other places
		TestBed.configureTestingModule({
			imports: [PaymentOptionComponent],
			providers: [
				provideRouter(homeRoutes),
				{
					provide: ActivatedRoute,
					useValue: {
						paramMap: of({
							get: (key: string) => {
								if (key === 'id') {
									return '123';
								}
								return null;
							},
						}),
					},
				},
			],
		});
	});

	it('should set the projectid based on the parameter id', () => {
		// Recreate the component to apply the new mock, and trigger change detection manually
		TestBed.compileComponents();
		fixture = TestBed.createComponent(PaymentOptionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

        // Call the inOnInit method and check to see if the parameter works
		component.ngOnInit();
		expect(component.projectId()).toBe(123);
	});

	it('should not set the projectid if the parameter is not `id`', () => {
		// Override the mock ActivatedRoute to return a different parameter instead of id, showcasing an instace where a different parameter is in the url
		TestBed.overrideProvider(ActivatedRoute, {
			useValue: {
				paramMap: of({
					get: (key: string) => {
						if (key) return { name: 'test' };
						else return null;
					},
				}),
			},
		});
		// Recreate the component to apply the new mock, and trigger change detection manually
		TestBed.compileComponents();
		fixture = TestBed.createComponent(PaymentOptionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

        // Call ngOnInit, and confirm that it works as intended when the url parameter is not what you are looking for.
		component.ngOnInit();
		expect(component.projectId()).toBeNaN();
	});
});

```

That is it, we are done.

Hey 👋, I believe you enjoyed this shortie (it serves as a note to my future self 😎) and learned something new and valuable. Learn about how to test [Router.navigate in Angular here.](https://konadu.devhow-to-test-router-navigate-in-angular)

You can also follow me on [Twitter (or instead X 😂)](https://twitter.com/akuoko_konadu) as I share more tips and tricks to make you improve as a better software engineer.

Until then, happy coding!
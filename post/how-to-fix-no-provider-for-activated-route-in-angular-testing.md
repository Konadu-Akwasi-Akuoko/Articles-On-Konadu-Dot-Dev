# How Fix NullInjectorError: No provider for ActivatedRoute, in Angular

Published on August 13, 2024

![how to fix NullInjectorError No provider for ActivatedRoute](https://cdn.sanity.io/images/ok7qsbpm/production/a8832369db190ee2d03a6b3ec6621f6de1206bbc-1692x1026.png?q=75&fit=clip&auto=format&fm=webp)

Last time we talked about how to [test the injectQuery method](https://konadu.devhow-to-test-inject-query-angular-tanstack-query) in Tanstack Query, but for today let's talk about how to fix this classic error: `NullInjectorError: No provider for ActivatedRoute.`

```undefined
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentOptionComponent } from './payment-option.component';
import { provideRouter } from '@angular/router';
import { homeRoutes } from '../../home.routes';

describe('PaymentOptionComponent', () => {
	let component: PaymentOptionComponent;
	let fixture: ComponentFixture<PaymentOptionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [PaymentOptionComponent],
            // Just add provideRouter, to your provider, you can provide an array of routes to the provideRouter as an argument
			providers: [provideRouter([])],
		}).compileComponents();

		fixture = TestBed.createComponent(PaymentOptionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
```

That is it, we are done.

Hey 👋, I believe you enjoyed this shortie (it serves as a note to my future self 😎) and learned something new and valuable. Learn about how to test [Router.navigate in Angular here.](https://konadu.devhow-to-test-router-navigate-in-angular)

You can also follow me on [Twitter (or instead X 😂)](https://twitter.com/akuoko_konadu) as I share more tips and tricks to make you improve as a better software engineer.

Until then, happy coding!
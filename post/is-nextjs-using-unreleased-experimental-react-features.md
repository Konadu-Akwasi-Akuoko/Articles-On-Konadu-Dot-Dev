# Is Next.js Using Unreleased Experimental React Features?

Published on October 30, 2023

![Someone doing investigation about if next.js is using unreleased react features or not](https://cdn.sanity.io/images/ok7qsbpm/production/c012440d49bb88fc88371d8f5bda7b234f9b8715-1692x1024.png?q=75&fit=clip&auto=format&fm=webp)

Next.js, the beloved framework for server rendered React applications since 2016, has been a hot topic lately. With the release of Next.js 13 and beyond, some eyebrows were raised. Why? Because the Next.js team and Vercel seemed to be pushing the boundaries by adopting new React coding conventions, such as [React Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components) and the [React Taint API](https://nextjs.org/blog/security-nextjs-server-components-actions#:~:text=Next.js%2014%20release%2C%20you%20can%20also%20try%20out%20the%20experimental%20React%20Taint%20APIs). 

But what’s the truth behind the curtain? Are they secretly using unreleased, or beta React features? Let’s explore this together!

## The Backstory

Before we delve deeper, let's take a moment to understand the genesis of Next.js. As we know, Next.js is an open-source web development framework that was brought to life by [Vercel](https://vercel.com/home). It is built upon [React](https://react.dev/), a popular JavaScript library for building user interfaces, and extends its capabilities by incorporating features that are not inherently present in React.

Next.js introduced several groundbreaking concepts such as [server-side rendering](https://nextjs.org/docs/pages/building-your-application/rendering/server-side-rendering), [static website generation](https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation), and [incremental static regeneration](https://nextjs.org/docs/pages/building-your-application/rendering/incremental-static-regeneration). It's worth noting that during the early stages of Next.js, React was primarily focused on [client-side rendering](https://www.patterns.dev/posts/client-side-rendering).

The innovative approach adopted by the Next.js team presented a wealth of [potential advantages](https://cloudinary.com/guides/automatic-image-cropping/server-side-rendering-benefits-use-cases-and-best-practices) over traditional client-side rendering, **particularly for websites where SEO is a priority**. One of the most notable benefits of SSR (Server-Side Rendering) is its ability to enhance website performance. By shifting some of the rendering tasks to the server, it reduces the workload on the user’s browser, leading to quicker initial load times and a more seamless user experience. Additionally, search engines like Google employ web crawlers to index and rank websites. Historically, these crawlers have had difficulties parsing JavaScript-heavy websites that rely on CSR (Client-Side Rendering), which could potentially result in lower search rankings. With SSR, however, the server delivers fully rendered HTML content, simplifying the task for web crawlers and thereby enhancing your website's visibility on search engines.

Despite the numerous improvements Next.js has brought to the web development landscape, it has not been immune to criticism. Some individuals within the developer community have expressed reservations or negative opinions about Next.js. In the following sections, we will explore these controversies in more detail.

## The Controversy

The journey of Next.js into the realm of cutting-edge technology began with its 13th release. The team behind Next.js started to incorporate features that were not yet officially included in the [React stable releases](https://github.com/facebook/react/releases/). This bold move sparked a wave of discussions in the developer community.

For instance, when Next.js 13 was launched, it introduced [React Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components), a feature that was not part of the stable version of React at that time. This feature allows developers to render components on the server, reducing the amount of JavaScript sent to the client and improving performance.

The trend continued with the release of Next.js 14, which incorporated the [React Taint API](https://react.dev/reference/react/experimental_taintObjectReference). This API, still marked as experimental in React's documentation, provides developers with a mechanism to prevent potential cross-site scripting (XSS) attacks by marking certain data as "tainted" or potentially unsafe.

These forward-thinking decisions by the Next.js team have led to some developers expressing concerns. They question the prudence of using features that are still in experimental stages and not yet part of React's stable releases. These concerns primarily revolve around potential instability or future compatibility issues.

## Diving Deeper

In reality, Next.js incorporates a variety of features that are not yet included in the [stable version of React](https://github.com/facebook/react/releases/). This has led to a certain level of apprehension among some individuals in the developer community regarding Vercel's approach to utilizing bleeding-edge technology. Here are some of the primary concerns:

* Is there a risk that the cutting-edge API features currently being used in Next.js might become obsolete in the next 2 to 3 years if they fail to make it into the stable version of React?
* Could it be possible that the new features Next.js is incorporating are too riddled with bugs to be used effectively?

These are valid questions that warrant thoughtful consideration. Let's attempt to address these concerns and shed some light on these issues.

### Meet React Canary

Next.js uses the React canary channel. What is the canary channel? From React team:

“We’d like to offer the React community an option to adopt individual new features as soon as their design is close to final, before they’re released in a stable version—similar to how Meta has long used bleeding-edge versions of React internally. We are introducing a new officially supported [Canary release channel](https://react.dev/community/versioning-policy#canary-channel). It lets curated setups like frameworks decouple adoption of individual React features from the React release schedule.” — Blog post from [react.dev](https://react.dev/blog/2023/05/03/react-canaries)

In essence, the React team is encouraging others, particularly authors of frameworks, to gain early access to new React features before they are rolled out in the stable channel. This naturally leads to the question: Is the canary branch of React stable? To answer this, we need to delve into the development process of React features.

1. The development process begins with an initial version of the feature, prefixed with `experimental_` or `unstable_`. At this stage, the feature is only available in the `experimental` release channel and is subject to significant changes or may not even make it into the stable react version.
2. The react team then identify a team at Meta who is willing to test this feature and provide valuable feedback. This collaboration leads to a series of modifications as the feature gradually becomes more stable. As stability improves, the React team engages with more teams at Meta for further testing.
3. Once they gain confidence in the design, they remove the prefix from the API name and make the feature available on the `main` branch by default, which is used by most Meta products. At this point, the feature is accessible to any team at Meta.
4. As the feature gains more traction, it is posted in the [Request for Comments (RFC) repo](https://github.com/reactjs/rfcs). By this stage, the React team is confident that the design works for a wide range of use cases, although there may still be some last-minute adjustments.
5. When they are on the verge of making an open-source release, they draft documentation for the feature. Finally, the feature is released in a stable React release, making it available to the broader developer community.

It's crucial to highlight step 3 in this process, where the React team removes the prefix (either `experimental_` or `unstable_`) from the API name and makes the feature available on the `main` branch by default. This branch is predominantly used by most Meta products. This implies that the Meta team has been utilizing unreleased React features for quite some time. It's important to understand that this is part of their standard release schedule since the inception of React and is not related to the canary releases.

Step 4 in the process is also particularly noteworthy. At this stage, the React team posts a feature to the [Request for Comments (RFC) repository](https://github.com/reactjs/rfcs). It's important to understand that by this point, as per step 3, the feature is already being utilized by a team at Meta. This implies that before a feature is introduced into the RFC repository, it has undergone practical use and testing by a team at Meta.

Furthermore, it's worth noting that before a feature is added to the RFC repository, its design is nearing stability. You might wonder, what exactly is this RFC repository? The RFC repository serves as a platform where the React team posts [significant features](https://legacy.reactjs.org/docs/how-to-contribute.html#request-for-comments-rfc) that are slated for future inclusion in React. The primary purpose of this practice is to gather consensus from the community during the design process.

This RFC repository has been the starting point for several key features in React's history. For instance, [`React.memo`](https://github.com/reactjs/rfcs/blob/7f8492f6a177fc33fe807d242319f2f96353bf68/text/0063-memo.md) was posted on October 23rd, 2018, [`React hooks`](https://github.com/reactjs/rfcs/blob/7f8492f6a177fc33fe807d242319f2f96353bf68/text/0068-react-hooks.md) was posted on July 25th, 2019, and [`React Server Components`](https://github.com/reactjs/rfcs/blob/7f8492f6a177fc33fe807d242319f2f96353bf68/text/0188-server-components.md) was posted on October 25th, 2022. Each of these features began their journey in the RFC repository before becoming integral parts of React.

As the React team has indicated, this development approach has proven effective for the majority of features they have released to date. However, they acknowledge that there can be a substantial time gap between when a feature is generally ready for use (as per step 3) and when it is officially released in the open-source community (as per step 5).

To bridge this gap, the [React Canary](https://react.dev/blog/2023/05/03/react-canaries) version was introduced. This version serves as a conduit for the React community to adopt the same approach as Meta, enabling them to incorporate individual new features as soon as they become available. This eliminates the need to wait for the next release cycle of React. In essence, React Canary offers developers early access to new features, fostering innovation and keeping pace with the rapidly evolving landscape of web development.

This approach mirrors the methodology adopted by TC39, the committee responsible for JavaScript standards. They handle changes in a [staged manner](https://tc39.es/process-document/), with new features being available in various stages before they become part of the official specification. Similarly, new React features may be accessible in frameworks built on React even before they are included in a stable React release, much like how new JavaScript features are deployed in [browsers](https://blog.bitsrc.io/how-new-features-are-added-to-javascript-5d8744bcc344) prior to their official ratification.

The introduction of rolling releases via the Canary channel enables the React team to establish a more efficient feedback loop. This ensures that new features undergo thorough testing within the community before they are officially released. In essence, when the Next.js team incorporates React Canary features into their framework, they are participating in a form of preliminary testing. This contributes to the refinement of nearly completed features that will eventually be included in a major or stable version of React.

For most developers using React outside of a specific framework, it is good to stick with the Stable releases. But the advantage of this Canary approach is that it allows framework authors to deliver almost completed React features and bug fixes to their users ahead of schedule. However, it's important to note that this approach does come with additional responsibilities, as framework authors would need to review which React commits are being integrated and ensure clear communication with their users about which React changes are included in their releases. This transparency is crucial in managing user expectations and maintaining trust (trust issues 🥲).

You might be wondering, "What exactly is the Experimental channel?" Similar to the Canary channel, the [Experimental channel](https://react.dev/community/versioning-policy#experimental-channel) is a prerelease channel that aligns with the main branch of the React repository. However, unlike the Canary channel, Experimental releases incorporate additional features and APIs that are not yet prepared for a broader release.

Experimental releases can differ significantly from Canary and Latest releases. Experimental features are those that are not yet ready for public release and may undergo substantial changes before they reach their final form. Some of these experimental features may never reach a finalized state. The primary purpose of the Experimental channel is to test the feasibility of proposed changes in a controlled environment.

On the other hand, Canary releases are closely aligned with the code that Meta uses internally. As such, you can generally expect them to offer a relatively stable experience.

## The Final Assessment

At present, it appears that Next.js is truly pioneering new frontiers in the realm of React—albeit slightly ahead of the curve, but in a responsible manner. They are strategically utilizing existing React features to augment both the developer experience and the performance of the applications. Consider this as an early glimpse into the potential future of React.

Now, let's circle back to the two initial questions we posed:

1. Is there a risk that the cutting-edge API features currently being used in Next.js might become obsolete in the next 2 to 3 years if they fail to make it into the stable version of React?
  * The likelihood of this happening is quite low. As we've discussed, the Canary releases that the Next.js team utilizes are features that will eventually be incorporated into the stable version of React, and it is close to the version that Meta uses internally. Therefore, you can view it as getting an early preview of upcoming React features.
2. Could it be possible that the new features Next.js is incorporating are too riddled with bugs to be used effectively?
  * The answer to this is both yes and no. Yes, in the sense that there could be **minor** bugs present (emphasis on **minor**), given that Canary releases serve as a means for the React team to establish a robust feedback loop and ensure comprehensive community testing of new features. As part of this testing process, occasional bugs are to be expected. However, the answer is also no because as the development process progresses and framework authors relay any encountered bugs to the React team, these bugs will eventually be rectified. Thus, we can assert that if you wait for a few months after a framework like Next.js announces a new React Canary feature, it should reach a high level of stability after this waiting period.

## In Conclusion

Next.js stands as a remarkable tool for crafting contemporary web applications. If you harbor concerns about Next.js utilizing unreleased React features, your apprehension is justified. After all, no one wants their production application to fail, leading to potential financial losses.

Despite the Next.js team pushing the envelope by adopting new React features, it's worth noting that they continue to support traditional methods and refrain from hastily deprecating them. At times, when they introduce a new experimental React feature such as the [`React Taint API`](https://nextjs.org/blog/security-nextjs-server-components-actions#:~:text=In the upcoming Next.js 14 release%2C you can also try out the experimental React Taint APIs by enable the taint flag in next.config.js.), it's placed under the experimental flag/property in the next.config.js file, which serves as a configuration file for Next.js applications.

Generally, it's advisable to exercise caution when enabling features by specifying them in the experimental property of the next.config.js. For instance, when `Server Actions` was in its experimental phase, there were issues with refreshing metadata and title tags when navigating between pages on a site.

In conclusion, if you're keen on using new React features available in the Canary release channel, feel free to do so as they are nearing stable release. However, if you encounter any issues, you always have the option to revert to traditional methods which are proven to work. But remember, if you prefer stability in your production applications, it's best to avoid any feature that requires enabling in the experimental section of the Next.js config file—unless you're willing to play the role of a tester.

Hey 👋, I believe you enjoyed this article and learned something new and valuable. If you are into TypeScript you can check how to use TypeScript Type Guards over [here](https://konadu.dev/how-to-use-typescript-type-guard). You can follow me on [Twitter (or rather X 😂)](https://twitter.com/akuoko_konadu) as I share more tips and tricks to make you improve as a better software engineer.
React Q&A:

1. What is the difference between Component and PureComponent? give an
   example where it might break my app.
2. Context + ShouldComponentUpdate might be dangerous. Can think of why is
   that?
3. Describe 3 ways to pass information from a component to its PARENT.
4. Give 2 ways to prevent components from re-rendering.
5. What is a fragment and why do we need it? Give an example where it might
   break my app.
6. Give 3 examples of the HOC pattern.
7. what's the difference in handling exceptions in promises, callbacks and
   async...await.
8. How many arguments does setState take and why is it async.
9. List the steps needed to migrate a Class to Function Component.
10. List a few ways styles can be used with components.
11. How to render an HTML string coming from the server.

////////////////////////////////////////////////////////////

1. Main difference is in render behaviour. Component will rerender every time parent rerenders regardless if component’s props or state are same. PureComponent won’t rerender unless its props or state has changed.
2. Only thing that I can think of is if you have a deeply nested components relying on context data and somewhere in the middle shouldComponentUpdate prevents an update, then in theory, it should block the context propagation to other components below in hierarchy
3. Pass a callback function to a child component->child passes arguments to callback function->parent has access to data inside of the callback function; create a context on a parent component and update state from child component; not sure if this one counts but having global state like redux gives us ability for parent-child and child-parent communication;
4. In class based components we can use shouldComponentUpdate lifecycle method to prevent rendering and in functional components we can use react.memo() to wrap func component and memoize it
5. Fragment can be used as a wrapper around multiple elements without the need to add extra Dom nodes since components can only return element. Dont know if it can break app. I know it can break styles
6. Redux connect() gives ability to components to connect to redux state; React.Memo() is a HOC which prevents unnecessary rerenders if props are same; having multiple components doing requests to get user data we can create HOC withUser that wraps components and gives them the user data without the need to write user logic in each component;
7. Both promises and async/await use catch() or try catch block to capture errors. One thing with async/await try catch block is that await keyword needs to be used otherwise error will propagate and won’t be caught since async await returns a promise. For callbacks we can use .catch(). Try catch is unreliable since callback can be called in a different call stack and therefore error won’t be caught in try catch block.
8. 2 arguments; first one is function for updating state; second one is optional callback which gets called after setState is completed and state updated (https://stackoverflow.com/questions/47332322/onselect-function-in-antd-calendar-component/47332472#47332472) one of my answers on stackoverflow :) . It is async because of performance. React delays state update and multiple updates get batched together. I think the key of this is it doesn’t matter how many updates you have for example in an event handler react will produce a single serenader at the end of it.
9. Generally speaking, removing class prefix and extends suffix and creating a function instead of a class; removing render method and using just return; removing lifecycle methods, state and binding methods and replacing with hooks (useState,useEffect) and creating function expressions; some other steps may be needed depending on how the component is structured
10. Global styles in index.html file; file for each component; inline styles; attach style obj to style property
11. Using DangerouslySetInnerHTML attribute

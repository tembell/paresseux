![Paresseux Logo](./docs/assets/artwork.jpg)

Paresseux is a React modal management library designed to streamline the handling of modals in a linear fashion, especially within complex workflows. It provides a convenient way to manage modals and their interactions while keeping your codebase clean and maintainable.

## Getting Started

To start using Paresseux in your React application, follow these simple steps:

### Installation

Install the library using your favorite package manager:

```bash
npm install @tembell/paresseux
# or
yarn add @tembell/paresseux
# or
pnpm add @tembell/paresseux
```

### Wrap Your App

Wrap your application with the `<ModalsProvider>` to enable the use of the `useOpenModal` hook:

```tsx
import { ModalsProvider } from '@tembell/paresseux';

function App() {
  return (
    <ModalsProvider>
      {/* Your app components */}
    </ModalsProvider>
  );
}
```

### Example Usage

Now, you can use the `useOpenModal` hook to manage your modals in a linear flow. Here's an example:

```tsx
import { useOpenModal } from '@tembell/paresseux';

export default function YourComponent() {
  const openModal = useOpenModal();

  async function takeAction() {
    type SlothAction = 'sleep' | 'eat' | undefined;
    const slothAction = await openModal<SlothAction>((resolve) =>
      <SlothActionModal 
        onCancel={() => resolve(undefined)}
        onChooseAction={(value) => resolve(value)}
      />
    );

    // undefined for cancel
    if (!slothAction) return;

    if (slothAction === 'sleep') {
      // Go to sleep ...
      return;
    }

    type Food = 'leaves' | 'fruits' | 'insects' | undefined;
    const foodChoice = await openModal<Food>((resolve) =>
     <FoodModal 
        onCancel={() => resolve(undefined)}
        onChooseAction={(value) => resolve(value)}
      />
    );

    // undefined for cancel
    if (!foodChoice) return;

    // Eat chosen fruit...
  }

  return (
    <>
      <h1>Hey Mr.Sloth, What do you want to do today?</h1>
      <Button onClick={takeAction}>Take Action</Button>
    </>
  );
}
```

You can also go to the `./examples/simple` React App to see a full app usage.

## Typescript
To be able to know what the return type is of the `openModal` you need
to provide it a type, not giving a type will result in `unknown`.
```tsx
// ----- No Type ------
const someValue = await openModal((resolve)=> 
  <div 
    onClick={() => resolve("click")}>
      Hello World
  </div>
);

// `someValue` will contain "click" but will be typed to `unknown` 



// ----- With Type ------
const someValue = await openModal<'click'>((resolve)=> 
  <div 
    onClick={() => resolve("click")}>
      Hello World
  </div>
);
// `someValue` will contain "click" and will be typed to `"click"` 
```


## Contributors

- **Yair** - [@yairorpo](https://github.com/yairorpo)
- **Ariel Benichou** - [@ArielBenichou](https://github.com/ArielBenichou)

A special thanks to Yair for the brilliant idea and the initial pieces of code that laid the foundation for Paresseux.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

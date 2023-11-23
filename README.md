# Paresseux: 🐨 Lazy & Synchronous flows for modals interactions in React
![Paresseux Logo](link_to_logo)

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
    const slothAction = await openModal<SlothAction>(
      <SlothActionModal />
    );

    // undefined for cancel
    if (!slothAction) return;

    if (slothAction === 'sleep') {
      // Go to sleep ...
      return;
    }

    type Food = 'leaves' | 'fruits' | 'insects' | undefined;
    const foodChoice = await openModal<Food>(
      <FoodModal />
    );

    // undefined for cancel
    if (!foodChoice) return;

    // Eat chosen fruit...
  }

  return (
    <>
      <h1>Hey Slothy, What do you want to do today?</h1>
      <Button onClick={takeAction}>Take Action</Button>
    </>
  );
}
```
## Contributors

- **Yair** - [@yairorpo](https://github.com/yairorpo)
- **Ariel Benichou** - [@ArielBenichou](https://github.com/ArielBenichou)

A special thanks to Yair for the brilliant idea and the initial pieces of code that laid the foundation for Paresseux.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

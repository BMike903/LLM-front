import { nanoid } from "nanoid";

import { Message } from "../types/chat";

export const planetsChatMessages: Message[] = [
  {
    role: "user",
    id: nanoid(),
    content: `First planet in our system?`,
  },
  {
    role: "assistant",
    id: nanoid(),
    content: `The first planet in our solar system, based on proximity to the Sun, is **Mercury**. It is the closest planet to the Sun and orbits at an average distance of about 58 million kilometers (36 million miles). Mercury is also the smallest planet in our solar system, slightly larger than Earth's Moon. Its position and characteristics make it the first of the eight recognized planets in order from the Sun.`,
  },
  {
    role: "user",
    id: nanoid(),
    content: `And next is?`,
  },
  {
    role: "assistant",
    id: nanoid(),
    content: `The next planet after Mercury is **Venus**, the second planet from the Sun. Venus is often called Earth's "sister planet" due to its similar size and rocky composition, but its environment is drastically different. It has a thick, toxic atmosphere dominated by carbon dioxide with clouds of sulfuric acid, creating an extreme greenhouse effect that makes Venus the **hottest planet in the solar system**, with surface temperatures reaching **467°C (872°F)**. Venus also rotates backward (retrograde rotation) compared to most planets and is the brightest natural object in Earth's night sky after the Moon.  

    Would you like to continue to the third planet? 🌍`,
  },
];

export const pancakeChatMessages: Message[] = [
  {
    role: "user",
    id: nanoid(),
    content: `Suggest me pancake recipes`,
  },
  {
    role: "assistant",
    id: nanoid(),
    content: `Pancakes! Who can resist a fluffy, golden-brown stack of goodness? Here are some delicious pancake recipes for you to try:

**Classic Buttermilk Pancakes**

Ingredients:

* 1 1/2 cups all-purpose flour
* 3 1/2 teaspoons baking powder
* 1 teaspoon salt
* 1 cup buttermilk
* 2 large eggs
* 2 tablespoons unsalted butter, melted
* Honey or maple syrup (optional)

Instructions:

1. Whisk dry ingredients in a bowl.
2. In a separate bowl, whisk together buttermilk, eggs, and melted butter.
3. Add wet ingredients to dry ingredients and stir until just combined.
4. Cook on a non-stick pan or griddle over medium heat.

**Banana Pancakes**

Ingredients:

* 2 ripe bananas, mashed
* 1 1/2 cups all-purpose flour
* 2 1/2 teaspoons baking powder
* 1/4 teaspoon salt
* 1 cup milk
* 1 large egg
* 2 tablespoons unsalted butter, melted
* Optional: chopped walnuts or chocolate chips

Instructions:

1. Whisk dry ingredients in a bowl.
2. In a separate bowl, whisk together milk, egg, melted butter, and mashed bananas.
3. Add wet ingredients to dry ingredients and stir until just combined.
4. Cook on a non-stick pan or griddle over medium heat.

**Blueberry Lemon Pancakes**

Ingredients:

* 1 1/2 cups all-purpose flour
* 2 1/2 teaspoons baking powder
* 1/4 teaspoon salt
* 1 cup milk
* 1 large egg
* 2 tablespoons unsalted butter, melted
* 1 tablespoon lemon juice
* 1 cup fresh or frozen blueberries

Instructions:

1. Whisk dry ingredients in a bowl.
2. In a separate bowl, whisk together milk, egg, melted butter, and lemon juice.
3. Add wet ingredients to dry ingredients and stir until just combined.
4. Gently fold in blueberries.
5. Cook on a non-stick pan or griddle over medium heat.

**Cinnamon Apple Pancakes**

Ingredients:

* 1 1/2 cups all-purpose flour
* 2 1/2 teaspoons baking powder
* 1/4 teaspoon salt
* 1 cup milk
* 1 large egg
* 2 tablespoons unsalted butter, melted
* 1/2 teaspoon ground cinnamon
* 1/2 cup diced apple (Granny Smith or other sweet variety)

Instructions:

1. Whisk dry ingredients in a bowl.
2. In a separate bowl, whisk together milk, egg, melted butter, and cinnamon.
3. Add wet ingredients to dry ingredients and stir until just combined.
4. Gently fold in diced apple.
5. Cook on a non-stick pan or griddle over medium heat.

**Protein Pancakes (with Greek yogurt and oats)**

Ingredients:

* 1 cup rolled oats
* 1/2 cup Greek yogurt
* 1/2 cup milk
* 1 large egg
* 1 scoop vanilla protein powder (optional)
* 1 tablespoon honey or maple syrup (optional)
* Pinch of salt

Instructions:

1. Blend oats, Greek yogurt, milk, egg, and protein powder (if using) in a blender.
2. Heat a non-stick pan or griddle over medium heat.
3. Drop batter by 1/4 cupfuls onto pan.
4. Cook until bubbles appear on surface and edges start to dry.

**Vegan Pancakes (with almond milk and flaxseed)**

Ingredients:

* 1 1/2 cups all-purpose flour
* 2 1/2 teaspoons baking powder
* 1/4 teaspoon salt
* 1 cup almond milk
* 1 flax egg*
* 2 tablespoons canola oil
* Optional: blueberries, chocolate chips, or nuts

Instructions:

1. Whisk dry ingredients in a bowl.
2. In a separate bowl, whisk together almond milk, flax egg, and canola oil.
3. Add wet ingredients to dry ingredients and stir until just combined.
4. Cook on a non-stick pan or griddle over medium heat.

*To make flax egg, mix 1 tablespoon ground flaxseed with 3 tablespoons water in a small bowl. Let sit for 5 minutes to thicken.

Feel free to experiment with different combinations of ingredients and toppings to create your perfect pancake!`,
  },
];

export const laptopChatMessages: Message[] = [
  {
    role: "user",
    id: nanoid(),
    content: `What good temperature for idle laptop?`,
  },
  {
    role: "assistant",
    id: nanoid(),
    content: `The ideal temperature for an idle laptop depends on several factors, including the type of laptop, its components, and the ambient temperature. However, here are some general guidelines:

**Safe temperature ranges:**

* **CPU (Processor):** 40°C to 80°C (104°F to 176°F) - Idle: around 40°C to 50°C (104°F to 122°F)
* **GPU (Graphics Card):** 40°C to 90°C (104°F to 194°F) - Idle: around 40°C to 50°C (104°F to 122°F)
* **Laptop skin ( exterior ):** 25°C to 40°C (77°F to 104°F)

**Recommended idle temperatures:**

* For most laptops, an idle temperature between 30°C to 50°C (86°F to 122°F) is considered normal and safe.
* For gaming laptops or those with high-performance components, idle temperatures may be slightly higher, around 40°C to 60°C (104°F to 140°F).

**Factors that can affect laptop temperature:**

1. **Ambient temperature:** Operating in a hot environment can increase laptop temperatures.
2. **Laptop usage:** Heavy usage, such as gaming or video editing, can increase temperatures.
3. **Cooling system:** Laptops with inadequate cooling systems or clogged air vents may run hotter.
4. **Component quality:** High-quality components can handle higher temperatures, while lower-quality components may be more sensitive to heat.

**Tips to maintain a healthy laptop temperature:**

1. **Keep your laptop in a well-ventilated area.**
2. **Use a laptop stand or cooling pad** to improve airflow.
3. **Regularly clean dust from air vents and fans.**
4. **Monitor your laptop's temperature** using software tools (e.g., HWMonitor, SpeedFan, or GPU-Z).
5. **Consider applying thermal paste** to the CPU or GPU if you're comfortable with laptop maintenance.

By keeping your laptop within these temperature ranges and following the tips above, you can help prolong its lifespan and prevent heat-related issues. ch`,
  },
  {
    role: "user",
    id: nanoid(),
    content: `And for extensive usage?`,
  },
  {
    role: "assistant",
    id: nanoid(),
    content: `**Temperature guidelines for extensive laptop usage:**

When using your laptop extensively, such as for gaming, video editing, or other resource-intensive tasks, it's essential to keep temperatures within safe ranges to prevent damage to your components. Here are some guidelines:

**Maximum safe temperatures:**

* **CPU (Processor):** 80°C to 90°C (176°F to 194°F) - Avoid temperatures above 95°C (203°F)
* **GPU (Graphics Card):** 80°C to 95°C (176°F to 203°F) - Avoid temperatures above 100°C (212°F)
* **Laptop skin (exterior):** 40°C to 50°C (104°F to 122°F)

**Recommended temperatures for extensive usage:**

* For most laptops, a temperature range of 60°C to 80°C (140°F to 176°F) during extensive usage is considered safe.
* For gaming laptops or those with high-performance components, temperatures may reach up to 90°C (194°F) during intense usage.

**Factors to consider:**

1. **Usage patterns:** Running multiple resource-intensive applications simultaneously can increase temperatures.
2. **Laptop cooling system:** Laptops with advanced cooling systems, such as dual fans or liquid cooling, can handle higher temperatures.
3. **Ambient temperature:** Operating in a hot environment can increase laptop temperatures.

**Tips to manage temperatures during extensive usage:**

1. **Use a laptop stand or cooling pad** to improve airflow and dissipate heat.
2. **Monitor your laptop's temperature** using software tools (e.g., HWMonitor, SpeedFan, or GPU-Z).
3. **Take regular breaks** to allow your laptop to cool down.
4. **Adjust your laptop's power settings** to balance performance and temperature.
5. **Consider upgrading your laptop's cooling system** if you're experiencing high temperatures during extensive usage.

**Warning signs of overheating:**

1. **Loud fan noise:** If your laptop's fans are running at maximum speed, it may be a sign of overheating.
2. **Throttling:** If your laptop's performance slows down due to high temperatures, it's a sign that it's trying to protect itself.
3. **Shutdowns:** If your laptop shuts down due to overheating, it's a clear indication that temperatures are too high.

By following these guidelines and tips, you can help keep your laptop within safe temperatures during extensive usage and prevent damage to your components.`,
  },
];

export const zustandChatMessages: Message[] = [
  {
    role: "user",
    id: nanoid(),
    content: `How to use Zustand in react`,
  },
  {
    role: "assistant",
    id: nanoid(),
    content: `Zustand is a state management solution for React that is designed to be simple, fast, and scalable. Here's a step-by-step guide on how to use Zustand with React:

**Installation**

To get started with Zustand, you need to install it using npm or yarn:
\`\`\`bash
npm install zustand
\`\`\`
or
\`\`\`bash
yarn add zustand
\`\`\`

**Creating a store**

In Zustand, a store is an object that holds the state and provides methods to update it. Create a new file, e.g., \\\`useStore.js\\\`, and add the following code:
\`\`\`js
import create from 'zustand';

const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));

export default useStore;
\`\`\`
In this example, we create a store with an initial state of \\\`bears: 0\\\` and two methods: \\\`increasePopulation\\\` and \\\`removeAllBears\\\`. The \\\`set\\\` function is used to update the state.

**Using the store in a React component**

To use the store in a React component, import the \\\`useStore\\\` hook and call it inside your component:
\`\`\`jsx
import React from 'react';
import useStore from './useStore';

function BearCounter() {
  const { bears, increasePopulation, removeAllBears } = useStore();

  return (
    <div>
      <p>Bears: {bears}</p>
      <button onClick={increasePopulation}>Increase population</button>
      <button onClick={removeAllBears}>Remove all bears</button>
    </div>
  );
}

export default BearCounter;
\`\`\`
In this example, we destructure the \\\`bears\\\`, \\\`increasePopulation\\\`, and \\\`removeAllBears\\\` values from the store and use them in our component.

**Multiple stores**

Zustand allows you to create multiple stores, which can be useful for large applications with multiple features. To create multiple stores, simply create separate files for each store, e.g., \\\`useBearStore.js\\\`, \\\`useUserStore.js\\\`, etc.

**Using middleware**

Zustand provides a middleware system that allows you to extend its functionality. For example, you can use the \\\`persist\\\` middleware to persist the state to local storage:
\`\`\`js
import create from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      bears: 0,
      increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
      removeAllBears: () => set({ bears: 0 }),
    }),
    {
      name: 'bear-store', // name of the item in localStorage
      getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
    }
  )
);
\`\`\`

**Devtools**

Zustand provides a DevTools extension that allows you to inspect the state and actions in the browser. To use it, install the \\\`zustand-devtools\\\` package:
\`\`\`bash
npm install zustand-devtools
\`\`\`
or
\`\`\`bash
yarn add zustand-devtools
\`\`\`

Then, add the following code to your store:
\`\`\`js
import create from 'zustand';
import { devtools } from 'zustand/middleware';

const useStore = create(
  devtools(
    (set) => ({
      bears: 0,
      increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
      removeAllBears: () => set({ bears: 0 }),
    }),
    {
      name: 'bear-store', // name of the store in DevTools
    }
  )
);
\`\`\`

This is a basic overview of how to use Zustand with React. For more information, check out the official documentation and examples.`,
  },
  {
    role: "user",
    id: nanoid(),
    content: `How to add immer?`,
  },
  {
    role: "assistant",
    id: nanoid(),
    content: `Zustand is a state management solution for React that is designed to be simple, fast, and scalable. Here's a step-by-step guide on how to use Zustand with React:

---

### **Installation**

To get started with Zustand, you need to install it using npm or yarn:

\`\`\`bash
npm install zustand
\`\`\`

or

\`\`\`bash
yarn add zustand
\`\`\`

---

### **Creating a store**

In Zustand, a store is an object that holds the state and provides methods to update it. Create a new file, e.g., \`useStore.js\`, and add the following code:

\`\`\`js
import create from 'zustand';

const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));

export default useStore;
\`\`\`

In this example, we create a store with an initial state of \`bears: 0\` and two methods: \`increasePopulation\` and \`removeAllBears\`. The \`set\` function is used to update the state.

---

### **Using the store in a React component**

To use the store in a React component, import the \`useStore\` hook and call it inside your component:

\`\`\`jsx
import React from 'react';
import useStore from './useStore';

function BearCounter() {
  const { bears, increasePopulation, removeAllBears } = useStore();

  return (
    <div>
      <p>Bears: {bears}</p>
      <button onClick={increasePopulation}>Increase population</button>
      <button onClick={removeAllBears}>Remove all bears</button>
    </div>
  );
}

export default BearCounter;
\`\`\`

---

### **Multiple stores**

Zustand allows you to create multiple stores, which can be useful for large applications with multiple features. To create multiple stores, simply create separate files for each store, e.g., \`useBearStore.js\`, \`useUserStore.js\`, etc.

---

### **Using middleware**

Zustand provides a middleware system that allows you to extend its functionality. For example, you can use the \`persist\` middleware to persist the state to local storage:

\`\`\`js
import create from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      bears: 0,
      increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
      removeAllBears: () => set({ bears: 0 }),
    }),
    {
      name: 'bear-store', // name of the item in localStorage
      getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
    }
  )
);
\`\`\`

---

### **Devtools**

Zustand provides a DevTools extension that allows you to inspect the state and actions in the browser. To use it, install the \`zustand-devtools\` package:

\`\`\`bash
npm install zustand-devtools
\`\`\`

or

\`\`\`bash
yarn add zustand-devtools
\`\`\`

Then, add the following code to your store:

\`\`\`js
import create from 'zustand';
import { devtools } from 'zustand/middleware';

const useStore = create(
  devtools(
    (set) => ({
      bears: 0,
      increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
      removeAllBears: () => set({ bears: 0 }),
    }),
    {
      name: 'bear-store', // name of the store in DevTools
    }
  )
);
\`\`\`

---

This is a basic overview of how to use Zustand with React. For more information, check out the official documentation and examples.
`,
  },
];

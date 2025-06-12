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

export const aircraftChatMessages: Message[] = [
  {
    role: "user",
    id: nanoid(),
    content: "How does piston aircraft works?",
  },
  {
    role: "assistant",
    id: nanoid(),
    content: `
        A piston aircraft, also known as a piston-engine aircraft or a reciprocating engine aircraft, is a type of aircraft that uses a piston engine to generate power. Here's a simplified overview of how it works:

        **Main Components:**

        1. **Piston Engine:** A piston engine, also known as a reciprocating engine, is the powerplant of the aircraft. It's essentially a type of internal combustion engine that uses a combination of air, fuel, and spark to generate power.
        2. **Propeller:** A propeller is attached to the engine and is responsible for converting the engine's power into thrust.
        3. **Airframe:** The airframe is the structural body of the aircraft, which includes the fuselage, wings, and control surfaces.

        **The Four-Stroke Cycle:**

        The piston engine works on a four-stroke cycle:

        1. **Intake Stroke:** In this stroke, the piston moves downward, creating a vacuum in the cylinder. Air and fuel are drawn into the cylinder through an intake valve.
        2. **Compression Stroke:** The intake valve closes, and the piston moves upward, compressing the air-fuel mixture in the cylinder.
        3. **Power Stroke:** The spark plug ignites the compressed air-fuel mixture, causing a small explosion that pushes the piston downward. This is the power stroke, where the engine generates torque.
        4. **Exhaust Stroke:** The piston moves upward again, pushing the exhaust gases out of the cylinder through an exhaust valve.

        **How it Generates Power:**

        The piston engine generates power by:

        1. **Converting Chemical Energy:** The engine converts the chemical energy stored in the fuel into mechanical energy through the four-stroke cycle.
        2. **Rotating the Crankshaft:** The up-and-down motion of the piston is transferred to a crankshaft, which converts the linear motion into rotary motion.
        3. **Turning the Propeller:** The rotary motion of the crankshaft is transmitted to the propeller, which converts the energy into thrust.

        **How it Generates Thrust:**

        The propeller generates thrust by:

        1. **Pushing Air:** As the propeller spins, it pushes air rearward, creating a forward force on the aircraft.
        2. **Creating a Pressure Difference:** The propeller creates a pressure difference between the front and back of the aircraft, with higher pressure at the front and lower pressure at the back. This pressure difference creates an upward force on the aircraft, known as thrust.

        **Control Systems:**

        The aircraft has various control systems that allow the pilot to control the aircraft:

        1. **Throttle:** The throttle controls the engine's power output.
        2. **Control Yoke or Stick:** The control yoke or stick controls the aircraft's pitch, roll, and yaw.
        3. **Rudder Pedals:** The rudder pedals control the aircraft's yaw.

        **In Summary:**

        A piston aircraft works by using a piston engine to generate power, which is then transmitted to a propeller. The propeller converts the energy into thrust, which propels the aircraft forward. The aircraft's control systems allow the pilot to control the aircraft's attitude, direction, and speed.`,
  },
  {
    role: "user",
    id: nanoid(),
    content: "Tell me more about physics behind propeller",
  },
  {
    role: "assistant",
    id: nanoid(),
    content: `
        A piston aircraft, also known as a piston-engine aircraft or a reciprocating engine aircraft, is a type of aircraft that uses a piston engine to generate power. Here's a simplified overview of how it works:

        **Main Components:**

        1. **Piston Engine:** A piston engine, also known as a reciprocating engine, is the powerplant of the aircraft. It's essentially a type of internal combustion engine that uses a combination of air, fuel, and spark to generate power.
        2. **Propeller:** A propeller is attached to the engine and is responsible for converting the engine's power into thrust.
        3. **Airframe:** The airframe is the structural body of the aircraft, which includes the fuselage, wings, and control surfaces.

        **The Four-Stroke Cycle:**

        The piston engine works on a four-stroke cycle:

        1. **Intake Stroke:** In this stroke, the piston moves downward, creating a vacuum in the cylinder. Air and fuel are drawn into the cylinder through an intake valve.
        2. **Compression Stroke:** The intake valve closes, and the piston moves upward, compressing the air-fuel mixture in the cylinder.
        3. **Power Stroke:** The spark plug ignites the compressed air-fuel mixture, causing a small explosion that pushes the piston downward. This is the power stroke, where the engine generates torque.
        4. **Exhaust Stroke:** The piston moves upward again, pushing the exhaust gases out of the cylinder through an exhaust valve.

        **How it Generates Power:**

        The piston engine generates power by:

        1. **Converting Chemical Energy:** The engine converts the chemical energy stored in the fuel into mechanical energy through the four-stroke cycle.
        2. **Rotating the Crankshaft:** The up-and-down motion of the piston is transferred to a crankshaft, which converts the linear motion into rotary motion.
        3. **Turning the Propeller:** The rotary motion of the crankshaft is transmitted to the propeller, which converts the energy into thrust.

        **How it Generates Thrust:**

        The propeller generates thrust by:

        1. **Pushing Air:** As the propeller spins, it pushes air rearward, creating a forward force on the aircraft.
        2. **Creating a Pressure Difference:** The propeller creates a pressure difference between the front and back of the aircraft, with higher pressure at the front and lower pressure at the back. This pressure difference creates an upward force on the aircraft, known as thrust.

        **Control Systems:**

        The aircraft has various control systems that allow the pilot to control the aircraft:

        1. **Throttle:** The throttle controls the engine's power output.
        2. **Control Yoke or Stick:** The control yoke or stick controls the aircraft's pitch, roll, and yaw.
        3. **Rudder Pedals:** The rudder pedals control the aircraft's yaw.

        **In Summary:**

        A piston aircraft works by using a piston engine to generate power, which is then transmitted to a propeller. The propeller converts the energy into thrust, which propels the aircraft forward. The aircraft's control systems allow the pilot to control the aircraft's attitude, direction, and speed. App.tsx:58:12
        The physics behind a propeller is fascinating. Here's a detailed explanation:

        **Propeller Basics**

        A propeller is a type of fan that uses a spinning blade to generate thrust. It's essentially a wing-like structure that uses the principles of aerodynamics to produce a forward force.

        **Key Components**

        1. **Blade:** The propeller blade is the long, curved section that spins around the hub. Its shape is designed to produce a difference in air pressure above and below the blade.
        2. **Hub:** The hub is the central axis around which the propeller blade spins.
        3. **Pitch:** The pitch of a propeller refers to the angle between the blade and the plane of rotation. A higher pitch means the blade is angled more steeply, which can increase thrust but also increase drag.

        **The Four Forces of Propeller Physics**

        When a propeller spins, it experiences four main forces:

        1. **Thrust (T):** The forward force created by the propeller as it pushes air rearward. Thrust is the desired outcome of propeller operation.
        2. **Torque (Q):** The rotational force that opposes the propeller's rotation. Torque is created by the resistance of the air to the propeller's motion.
        3. **Drag (D):** The backward force created by air resistance as the propeller moves through the air. Drag opposes the propeller's motion and reduces its efficiency.
        4. **Lift (L):** The upward force created by the propeller blade as it moves through the air. Lift is perpendicular to the blade's surface and is created by the difference in air pressure above and below the blade.

        **How Propellers Generate Thrust**

        As the propeller spins, the blade moves through the air, creating a difference in air pressure above and below the blade. This pressure difference creates an upward force (lift) and a forward force (thrust).

        Here's a step-by-step explanation:

        1. **Airflow:** As the propeller blade moves through the air, it creates a region of lower air pressure above the blade and a region of higher air pressure below the blade.
        2. **Lift Generation:** The difference in air pressure creates an upward force (lift) on the blade, which is perpendicular to the blade's surface.
        3. **Thrust Generation:** As the blade moves forward, it pushes air rearward, creating a forward force (thrust) on the aircraft.

        **Propeller Efficiency**

        The efficiency of a propeller is measured by its ability to convert the engine's power into thrust. Propeller efficiency is affected by several factors, including:

        1. **Pitch:** A higher pitch can increase thrust but also increase drag, reducing efficiency.
        2. **RPM:** A higher RPM can increase thrust but also increase drag and reduce efficiency.
        3. **Air Density:** Propeller efficiency is affected by air density, with higher air density resulting in more efficient operation.

        **Types of Propellers**

        There are several types of propellers, including:

        1. **Fixed-Pitch Propeller:** A fixed-pitch propeller has a fixed angle of attack and is designed for a specific operating condition.
        2. **Variable-Pitch Propeller:** A variable-pitch propeller can change its angle of attack in flight, allowing for more efficient operation across a range of conditions.
        3. **Constant-Speed Propeller:** A constant-speed propeller uses a governor to maintain a constant RPM, allowing for more efficient operation.

        In summary, the physics behind a propeller involves the interaction of four main forces: thrust, torque, drag, and lift. By understanding these forces and optimizing propeller design, engineers can create more efficient and effective propellers for a wide range of applications.`,
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

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
    content: `The first planet in our solar system is Mercury. It is the smallest planet and is closest to the Sun.`,
  },
  {
    role: "user",
    id: nanoid(),
    content: `And second one is?`,
  },
  {
    role: "assistant",
    id: nanoid(),
    content: `The second planet in our solar system is Venus. It's often referred to as Earth's sister planet due to their similar size and proximity to the Sun.`,
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

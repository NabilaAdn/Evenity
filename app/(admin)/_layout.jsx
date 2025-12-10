// import { Ionicons } from "@expo/vector-icons";
// import { Tabs } from "expo-router";

// export default function AdminLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//         tabBarActiveTintColor: "#007Aff",
//         tabBarInactiveTintColor: "gray",
//       }}>

//         <Tabs.Screen
//           name="index"
//           options={{
//             title: "Dashboard",
//             tabBarIcon:({color, size}) =>(
//               <Ionicons name="home-outline" size={size} color={color}/>
//             ),
//           }}
//         />

//         <Tabs.Screen
//           name="add-event"
//           options={{
//             title: "Tambah Event",
//             tabBarIcon:({color, size}) =>(
//               <Ionicons name="add-circle-outline" size={size} color={color}/>
//             ),
//           }}
//         />

//         <Tabs.Screen
//           name="edit-event"
//           options={{
//             title: "Edit Event",
//             tabBarIcon:({color, size}) =>(
//               <Ionicons name="create-outline" size={size} color={color}/>
//             ),
//           }}
//         />
        
//     </Tabs>
//   );
// }

import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useTheme } from "../../src/contexts/ThemeContext";

export default function AdminLayout() {
  const { theme } = useTheme();
<<<<<<< HEAD
=======

>>>>>>> 05f503674eab4be9f8ec0ddaf93031ef7567919c
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
<<<<<<< HEAD
        headerShown: false,
=======
>>>>>>> 05f503674eab4be9f8ec0ddaf93031ef7567919c
        tabBarActiveTintColor: theme.tabActive,
        tabBarInactiveTintColor: theme.tabInactive,
        tabBarStyle: {
          backgroundColor: theme.card,
          borderTopColor: theme.border,
          borderTopWidth: 1,
          paddingBottom: 5,
          paddingTop: 5,
<<<<<<< HEAD
          height: 120,
=======
          height: 60,
>>>>>>> 05f503674eab4be9f8ec0ddaf93031ef7567919c
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
<<<<<<< HEAD
        }
=======
        },
>>>>>>> 05f503674eab4be9f8ec0ddaf93031ef7567919c
      }}>

        <Tabs.Screen
          name="index"
          options={{
            title: "Dashboard",
            tabBarIcon:({color, size}) =>(
              <Ionicons name="home-outline" size={size} color={color}/>
            ),
          }}
<<<<<<< HEAD
        />    
=======
        />

        <Tabs.Screen
          name="add-event"
          options={{
            title: "Tambah Event",
            tabBarIcon:({color, size}) =>(
              <Ionicons name="add-circle-outline" size={size} color={color}/>
            ),
          }}
        />

        <Tabs.Screen
          name="edit-event/[id]"
          options={{
            title: "Edit Event",
              href: null,
          }}
        />
>>>>>>> 05f503674eab4be9f8ec0ddaf93031ef7567919c
        
        <Tabs.Screen
    name="add-event"
    options={{ href: null }}  // ❌ sembunyikan
  />

  <Tabs.Screen
    name="edit-event/[id]"
    options={{ href: null }}  // ❌ sembunyikan
  />

  <Tabs.Screen
    name="event-participants/[id]"
    options={{ href: null }}  // ❌ sembunyikan
  />

    </Tabs>
  );
}
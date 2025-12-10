import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
<<<<<<< HEAD
import { useRouter } from "expo-router";
=======
>>>>>>> 05f503674eab4be9f8ec0ddaf93031ef7567919c
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
<<<<<<< HEAD
  TextInput,
=======
>>>>>>> 05f503674eab4be9f8ec0ddaf93031ef7567919c
  TouchableOpacity,
  View
} from "react-native";
import Toast from "react-native-toast-message";
<<<<<<< HEAD
import { supabase } from "../../lib/supabase";
import { useTheme } from "../../src/contexts/ThemeContext";

export default function UserProfile() {
  const router = useRouter();
=======
import { useAuth } from "../../src/contexts/AuthContext";
import { useTheme } from "../../src/contexts/ThemeContext";
import createApi from "../../src/services/api";

export default function UserProfile() {
  const { user, token, isLoading: authLoading, logout } = useAuth();
>>>>>>> 05f503674eab4be9f8ec0ddaf93031ef7567919c
  const { theme, isDark, toggleTheme } = useTheme();
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [pendingEventId, setPendingEventId] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

<<<<<<< HEAD
  const isFocused = useIsFocused();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    if (isFocused) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isFocused]);
=======
  // State untuk popup detail event (TAMBAHAN BARU)
  const [selectedEvent, setSelectedEvent] = useState(null);

  const isFocused = useIsFocused();
  const api = createApi(token);
>>>>>>> 05f503674eab4be9f8ec0ddaf93031ef7567919c

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    if (isFocused) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isFocused]);

  const formatDate = (d) => {
    if (!d) return "-";
    const date = new Date(d);
    return `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()}`;
  };

<<<<<<< HEAD
  
=======
  const formatTime = (t) => (t ? t.substring(0, 5) : "-");

  const getCategoryStyle = (category) => {
    const cat = category || "Tanpa Kategori";
    return theme.categories[cat] || theme.categories["Tanpa Kategori"];
  };

>>>>>>> 05f503674eab4be9f8ec0ddaf93031ef7567919c
  const loadMyEvents = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("event_registrations") // tabel pendaftaran event
        .select(`
          id,
          events (
          id,
          title,
          event_date,
          start_time,
          end_time,
          location,
          category,
          max_participants,
          description
        )
          
        `)
        .eq("user_id", user.id);

      if (error) throw error;

      // Format ulang mengikuti struktur kode lama
      const formatted = data.map((r) => ({
        ...r.events,
        registration_id: r.id,
        start_date: r.events.event_date,
      }));

      setMyEvents(formatted);
    } catch (err) {
      console.log("Error load user events:", err);
    } finally {
      setLoading(false);
    }
  };
    
  const loadUser = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
  
    if (error) console.log(error);
    else setUser(user);
  };

  // Load profile from profiles table
  const loadProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error loading profile:", error);
        // Don't show toast here - profile might not exist yet
        return;
      }

      setProfile(data);
    } catch (err) {
      console.error("Unexpected error loading profile:", err);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (user?.id) {
      loadProfile(user.id);
    }
  }, [user]);

  useEffect(() => {
    if (isFocused && user?.id) {
      loadMyEvents();
    }
  }, [isFocused, user]);

  const confirmCancel = (eventId) => {
    setPendingEventId(eventId);
    setShowModal(true);
  };

  const handleCancelRegistration = async () => {
    if (!pendingEventId) return;

    setIsCancelling(true);
    setShowModal(false);

    try {
      await supabase
        .from("event_registrations")
        .delete()
        .eq("id", pendingEventId)
        .eq("user_id", user.id);

      Toast.show({ type: "success", text1: "Berhasil batalkan pendaftaran" });
      loadMyEvents();
    } catch (err) {
      Toast.show({ type: "error", text1: "Gagal membatalkan" });
    } finally {
      setIsCancelling(false);
      setPendingEventId(null);
    }
  };

<<<<<<< HEAD
  const [editModal, setEditModal] = useState(false);
const [editName, setEditName] = useState("");
const [editUsername, setEditUsername] = useState("");
const [editEmail, setEditEmail] = useState("");
const [saving, setSaving] = useState(false);

const openEditProfile = () => {
  if (!profile) return;

  setEditName(profile.name || "");
  setEditUsername(profile.username || "");
  setEditEmail(profile.email || "");

  setEditModal(true);
};

const saveProfile = async () => {
  if (!user) return;

  setSaving(true);

  const { error } = await supabase
    .from("profiles")
    .update({
      name: editName,
      username: editUsername,
      email: editEmail,
    })
    .eq("id", user.id);

  setSaving(false);

  if (error) {
    Toast.show({ type: "error", text1: "Gagal memperbarui profil" });
    console.log(error);
    return;
  }

  Toast.show({ type: "success", text1: "Profil berhasil diperbarui" });

  setEditModal(false);
  loadProfile(user.id);
};


=======
  // Handler untuk buka popup detail (TAMBAHAN BARU)
  const handleCardPress = (item) => {
    setSelectedEvent(item);
  };

>>>>>>> 05f503674eab4be9f8ec0ddaf93031ef7567919c
  return (
  <View style={{ flex: 1, backgroundColor: theme.background }}>
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
    >
{/* HEADER PROFILE TANPA ANIMASI */}
<View
  style={{
    backgroundColor: theme.primary,
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: theme.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  }}
>
  <View 
    style={{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10,
    }}
  >
    <View style={{ flexDirection: "row", alignItems: "center", gap: 20, flex: 1 }}>
      {/* Foto Bulat */}
      <View
        style={{
          width: 90,
          height: 90,
          borderRadius: 45,
          backgroundColor: "#fff",
          overflow: "hidden",
          elevation: 6,
        }}
      >
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
          }}
          style={{ width: "100%", height: "100%" }}
        />
      </View>

      {/* Nama + Username */}
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#fff",
            marginBottom: 4,
          }}
        >
<<<<<<< HEAD
          {profile?.name || "User"}
        </Text>
                  <TouchableOpacity
  onPress={openEditProfile}
  style={{
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginTop: 6,
    alignSelf: "flex-start",
  }}
>
  <Text style={{ color: "#fff", fontWeight: "600" }}>Edit Profil</Text>
</TouchableOpacity>
      </View>
    </View>

    {/* ICON DARK MODE */}
    <TouchableOpacity
      onPress={toggleTheme}
      style={{
        padding: 10,
        backgroundColor: "rgba(255,255,255,0.2)",
        borderRadius: 12,
        marginRight: 10,
      }}
    >
      <MaterialIcons
        name={isDark ? "light-mode" : "dark-mode"}
        size={24}
        color="#FFFFFF"
      />
    </TouchableOpacity>

    {/* TOMBOL LOGOUT */}
    <TouchableOpacity
      onPress={async () => {
              await supabase.auth.signOut();
              router.replace("/(auth)/login");
            }}
      style={{
        padding: 10,
        backgroundColor: "rgba(255,255,255,0.2)",
        borderRadius: 12,
      }}
    >
      <MaterialIcons
        name="logout"
        size={24}
        color="#fff"
      />
    </TouchableOpacity>
  </View>
</View>

=======
          {user?.name || "User"}
        </Text>

        <Text style={{ fontSize: 16, color: theme.primaryLight }}>
          @{user?.username || user?.email?.split("@")[0]}
        </Text>
      </View>
    </View>

    {/* ICON DARK MODE */}
    <TouchableOpacity
      onPress={toggleTheme}
      style={{
        padding: 10,
        backgroundColor: "rgba(255,255,255,0.2)",
        borderRadius: 12,
        marginRight: 10,
      }}
    >
      <MaterialIcons
        name={isDark ? "light-mode" : "dark-mode"}
        size={24}
        color="#FFFFFF"
      />
    </TouchableOpacity>

    {/* TOMBOL LOGOUT */}
    <TouchableOpacity
      onPress={logout}
      style={{
        padding: 10,
        backgroundColor: "rgba(255,255,255,0.2)",
        borderRadius: 12,
      }}
    >
      <MaterialIcons
        name="logout"
        size={24}
        color="#fff"
      />
    </TouchableOpacity>
  </View>
</View>

>>>>>>> 05f503674eab4be9f8ec0ddaf93031ef7567919c

      {/* STATS SECTION */}
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          marginTop: -25,
          gap: 12,
        }}
      >
        {/* TOTAL */}
        <View
          style={{
            flex: 1,
            backgroundColor: theme.card,
<<<<<<< HEAD
            padding: 15,
=======
            padding: 16,
>>>>>>> 05f503674eab4be9f8ec0ddaf93031ef7567919c
            borderRadius: 16,
            alignItems: "center",
            borderWidth: 1,
            borderColor: theme.border,
            elevation: 4,
          }}
        >
          <Ionicons name="calendar-outline" size={28} color={theme.primary} />
          <Text style={{ fontSize: 22, fontWeight: "bold", color: theme.text }}>
            {myEvents.length}
          </Text>
          <Text style={{ fontSize: 13, color: theme.textSecondary }}>Total</Text>
        </View>

        {/* SELESAI */}
        <View
          style={{
            flex: 1,
            backgroundColor: theme.card,
<<<<<<< HEAD
            padding: 15,
=======
            padding: 16,
>>>>>>> 05f503674eab4be9f8ec0ddaf93031ef7567919c
            borderRadius: 16,
            alignItems: "center",
            borderWidth: 1,
            borderColor: theme.border,
            elevation: 4,
          }}
        >
          <Ionicons name="checkmark-circle-outline" size={28} color={theme.success} />
          <Text style={{ fontSize: 22, fontWeight: "bold", color: theme.text }}>
<<<<<<< HEAD
            {myEvents.filter((e) => new Date(e.event_date) < new Date()).length}
=======
            {myEvents.filter((e) => new Date(e.date) < new Date()).length}
>>>>>>> 05f503674eab4be9f8ec0ddaf93031ef7567919c
          </Text>
          <Text style={{ fontSize: 13, color: theme.textSecondary }}>
            Selesai
          </Text>
        </View>

        {/* MENDATANG */}
        <View
          style={{
            flex: 1,
            backgroundColor: theme.card,
<<<<<<< HEAD
            padding: 15,
=======
            padding: 16,
>>>>>>> 05f503674eab4be9f8ec0ddaf93031ef7567919c
            borderRadius: 16,
            alignItems: "center",
            borderWidth: 1,
            borderColor: theme.border,
            elevation: 4,
          }}
        >
          <Ionicons name="time-outline" size={28} color={theme.warning} />
          <Text style={{ fontSize: 22, fontWeight: "bold", color: theme.text }}>
<<<<<<< HEAD
            {myEvents.filter((e) => new Date(e.event_date) >= new Date()).length}
=======
            {myEvents.filter((e) => new Date(e.date) >= new Date()).length}
>>>>>>> 05f503674eab4be9f8ec0ddaf93031ef7567919c
          </Text>
          <Text style={{ fontSize: 13, color: theme.textSecondary }}>
            Mendatang
          </Text>
        </View>
      </View>

      {/* LIST EVENT */}
      <View style={{ paddingHorizontal: 20, marginTop: 25 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: theme.text,
            marginBottom: 16,
          }}
        >
          📌 Event yang Kamu Ikuti
        </Text>

<<<<<<< HEAD
        {(loading) && (
=======
        {(loading || authLoading) && (
>>>>>>> 05f503674eab4be9f8ec0ddaf93031ef7567919c
          <ActivityIndicator size="large" color={theme.primary} />
        )}

        {!loading && myEvents.length === 0 && (
          <View style={{ alignItems: "center", marginTop: 40 }}>
            <Ionicons
              name="calendar-outline"
              size={80}
              color={theme.textTertiary}
            />
            <Text
              style={{
                color: theme.textSecondary,
                marginTop: 16,
                fontSize: 16,
              }}
            >
              Kamu belum mendaftar event apa pun.
            </Text>
          </View>
        )}

<<<<<<< HEAD
        {/* MANUAL LIST (bukan FlatList) */}
        {!loading &&
          myEvents.map((item) => (
            <View
              key={item.registration_id}
=======
        {/* MANUAL LIST (bukan FlatList) - TAMBAH onPress */}
        {!loading &&
          myEvents.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleCardPress(item)}
>>>>>>> 05f503674eab4be9f8ec0ddaf93031ef7567919c
              style={{
                padding: 18,
                borderRadius: 16,
                backgroundColor: theme.card,
                marginBottom: 14,
                borderWidth: 1,
                borderColor: theme.border,
                elevation: 3,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    backgroundColor: theme.primaryLight,
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 8,
                    color: theme.primary,
                    fontWeight: "700",
                    fontSize: 12,
                  }}
                >
                  {item.category || "Tanpa Kategori"}
                </Text>

                <Pressable
<<<<<<< HEAD
                  onPress={() => confirmCancel(item.registration_id)}
=======
                  onPress={(e) => {
                    e.stopPropagation();
                    confirmCancel(item.id);
                  }}
>>>>>>> 05f503674eab4be9f8ec0ddaf93031ef7567919c
                  style={{
                    backgroundColor: theme.errorLight,
                    paddingVertical: 6,
                    paddingHorizontal: 12,
                    borderRadius: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <Ionicons name="close-circle" size={16} color={theme.error} />
                  <Text
                    style={{
                      color: theme.error,
                      fontWeight: "700",
                      fontSize: 13,
                    }}
                  >
                    Batal
                  </Text>
                </Pressable>
              </View>

              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  color: theme.text,
                  marginBottom: 10,
                }}
              >
                {item.title}
              </Text>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name="calendar-outline"
                  size={16}
                  color={theme.textSecondary}
                />
                <Text
                  style={{
                    marginLeft: 8,
                    color: theme.textSecondary,
                    fontSize: 14,
                  }}
                >
<<<<<<< HEAD
                  {formatDate(item.event_date)}
=======
                  {formatDate(item.date)}
>>>>>>> 05f503674eab4be9f8ec0ddaf93031ef7567919c
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 6,
                }}
              >
                <Ionicons
                  name="location-outline"
                  size={16}
                  color={theme.textSecondary}
                />
                <Text
                  style={{
                    marginLeft: 8,
                    color: theme.textSecondary,
                    fontSize: 14,
                  }}
                >
                  {item.location}
                </Text>
              </View>
<<<<<<< HEAD
            </View>
=======
            </TouchableOpacity>
>>>>>>> 05f503674eab4be9f8ec0ddaf93031ef7567919c
          ))}
      </View>
    </ScrollView>

<<<<<<< HEAD
      {/* MODAL KONFIRMASI */}
=======
      {/* MODAL KONFIRMASI BATAL */}
>>>>>>> 05f503674eab4be9f8ec0ddaf93031ef7567919c
      <Modal transparent visible={showModal} animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: theme.overlay,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <View
            style={{
              backgroundColor: theme.card,
              width: "90%",
              maxWidth: 400,
              borderRadius: 24,
              padding: 28,
              alignItems: "center",
              shadowColor: theme.shadow,
              shadowOpacity: 0.3,
              shadowRadius: 16,
              elevation: 10,
            }}
          >
            <View
              style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                backgroundColor: theme.errorLight,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              <Ionicons name="warning" size={36} color={theme.error} />
            </View>

            <Text
              style={{
                fontSize: 24,
                fontWeight: "700",
                marginBottom: 12,
                color: theme.text,
              }}
            >
              Yakin Batalkan?
            </Text>

            <Text
              style={{
                textAlign: "center",
                marginBottom: 28,
                color: theme.textSecondary,
                fontSize: 15,
                lineHeight: 22,
              }}
            >
              Kamu tidak akan bisa mengikuti event ini lagi setelah dibatalkan.
            </Text>

            <View style={{ flexDirection: "row", width: "100%", gap: 12 }}>
              <Pressable
                onPress={() => setShowModal(false)}
                style={{
                  flex: 1,
                  backgroundColor: theme.border,
                  paddingVertical: 14,
                  borderRadius: 12,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 16,
                    fontWeight: "600",
                    color: theme.text,
                  }}
                >
                  Tidak
                </Text>
              </Pressable>

              <Pressable
                onPress={handleCancelRegistration}
                style={{
                  flex: 1,
                  backgroundColor: theme.error,
                  paddingVertical: 14,
                  borderRadius: 12,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 16,
                    fontWeight: "700",
                    color: "#FFFFFF",
                  }}
                >
                  Ya, Batalkan
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

<<<<<<< HEAD
=======
      {/* MODAL DETAIL EVENT (TAMBAHAN BARU) */}
      <Modal visible={!!selectedEvent} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: theme.overlay,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <View
            style={{
              backgroundColor: theme.card,
              borderRadius: 24,
              padding: 24,
              width: "100%",
              maxWidth: 420,
              shadowColor: theme.shadow,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 16,
              elevation: 16,
            }}
          >
            <Text style={{ fontSize: 22, fontWeight: "bold", color: theme.text, marginBottom: 12 }}>
              {selectedEvent?.title}
            </Text>

            {selectedEvent && (
              <Text
                style={{
                  alignSelf: "flex-start",
                  backgroundColor: getCategoryStyle(selectedEvent.category).bg,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 8,
                  color: getCategoryStyle(selectedEvent.category).text,
                  fontWeight: "700",
                  marginBottom: 16,
                  fontSize: 13,
                  borderWidth: 1,
                  borderColor: getCategoryStyle(selectedEvent.category).border,
                }}
              >
                {selectedEvent.category || "Tanpa Kategori"}
              </Text>
            )}

            <View style={{ backgroundColor: theme.borderLight, height: 1, marginBottom: 16 }} />

            <View style={{ gap: 12, marginBottom: 16 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    backgroundColor: theme.primaryLight,
                    padding: 8,
                    borderRadius: 10,
                    marginRight: 12,
                  }}
                >
                  <MaterialIcons name="event" size={20} color={theme.primary} />
                </View>
                <Text style={{ color: theme.text, fontSize: 15 }}>
                  {formatDate(selectedEvent?.date)}
                </Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    backgroundColor: theme.primaryLight,
                    padding: 8,
                    borderRadius: 10,
                    marginRight: 12,
                  }}
                >
                  <MaterialIcons name="access-time" size={20} color={theme.primary} />
                </View>
                <Text style={{ color: theme.text, fontSize: 15 }}>
                  {formatTime(selectedEvent?.start_time)} - {formatTime(selectedEvent?.end_time)}
                </Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    backgroundColor: theme.primaryLight,
                    padding: 8,
                    borderRadius: 10,
                    marginRight: 12,
                  }}
                >
                  <MaterialIcons name="place" size={20} color={theme.primary} />
                </View>
                <Text style={{ color: theme.text, fontSize: 15, flex: 1 }}>
                  {selectedEvent?.location}
                </Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    backgroundColor: theme.successLight,
                    padding: 8,
                    borderRadius: 10,
                    marginRight: 12,
                  }}
                >
                  <MaterialIcons name="attach-money" size={20} color={theme.success} />
                </View>
                <Text style={{ color: theme.text, fontSize: 15, fontWeight: "600" }}>
                  Rp {Number(selectedEvent?.price).toLocaleString()}
                </Text>
              </View>
            </View>

            <View style={{ backgroundColor: theme.borderLight, height: 1, marginBottom: 16 }} />

            <Text style={{ color: theme.textSecondary, lineHeight: 22, marginBottom: 20 }}>
              {selectedEvent?.description}
            </Text>

            <Pressable
              onPress={() => setSelectedEvent(null)}
              style={{
                paddingVertical: 14,
                borderRadius: 12,
                backgroundColor: theme.primary,
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "700",
                }}
              >
                Tutup
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>

>>>>>>> 05f503674eab4be9f8ec0ddaf93031ef7567919c
      {isCancelling && (
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
        >
          <View
            style={{
              backgroundColor: theme.card,
              padding: 30,
              borderRadius: 20,
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color={theme.primary} />
            <Text style={{ marginTop: 16, color: theme.text, fontSize: 16 }}>
              Membatalkan...
            </Text>
          </View>
        </View>
      )}
<Modal visible={editModal} transparent animationType="slide">
  <View
    style={{
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    }}
  >
    <View
      style={{
        width: "100%",
        maxWidth: 400,
        backgroundColor: theme.card,
        padding: 25,
        borderRadius: 20,
        elevation: 10,
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          marginBottom: 16,
          color: theme.text,
        }}
      >
        Edit Profil
      </Text>

      {/* INPUT NAMA */}
      <Text style={{ color: theme.textSecondary, marginBottom: 6 }}>Nama</Text>
      <View
        style={{
          borderWidth: 1,
          borderColor: theme.border,
          backgroundColor: theme.background,
          borderRadius: 10,
          marginBottom: 16,
        }}
      >
        <TextInput
          style={{ padding: 12, color: theme.text }}
          value={editName}
          onChangeText={setEditName}
        />
      </View>

      {/* INPUT USERNAME */}
      <Text style={{ color: theme.textSecondary, marginBottom: 6 }}>
        Username
      </Text>
      <View
        style={{
          borderWidth: 1,
          borderColor: theme.border,
          backgroundColor: theme.background,
          borderRadius: 10,
          marginBottom: 16,
        }}
      >
        <TextInput
          style={{ padding: 12, color: theme.text }}
          value={editUsername}
          onChangeText={setEditUsername}
        />
      </View>

      {/* INPUT EMAIL */}
      <Text style={{ color: theme.textSecondary, marginBottom: 6 }}>Email</Text>
      <View
        style={{
          borderWidth: 1,
          borderColor: theme.border,
          backgroundColor: theme.background,
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <TextInput
          style={{ padding: 12, color: theme.text }}
          value={editEmail}
          onChangeText={setEditEmail}
          autoCapitalize="none"
        />
      </View>

      {/* BUTTONS */}
      <View style={{ flexDirection: "row", gap: 10 }}>
        <TouchableOpacity
          onPress={() => setEditModal(false)}
          style={{
            flex: 1,
            backgroundColor: theme.border,
            padding: 14,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ color: theme.text, fontWeight: "600" }}>Batal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={saving}
          onPress={saveProfile}
          style={{
            flex: 1,
            backgroundColor: theme.primary,
            padding: 14,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "700" }}>
            {saving ? "Menyimpan..." : "Simpan"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>

      <Toast />
    </View>
  );
}
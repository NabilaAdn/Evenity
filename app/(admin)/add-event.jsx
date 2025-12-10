<<<<<<< HEAD
import { Entypo, MaterialIcons } from "@expo/vector-icons";
=======
import { MaterialIcons } from "@expo/vector-icons";
>>>>>>> 05f503674eab4be9f8ec0ddaf93031ef7567919c
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useState } from "react";
<<<<<<< HEAD
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { supabase } from "../../lib/supabase";
import { useTheme } from "../../src/contexts/ThemeContext";
import { formatDateForAPI, formatTime } from "../../src/utils/helpers";
=======
import {
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Toast from "react-native-toast-message";
import { useAuth } from "../../src/contexts/AuthContext";
import { useTheme } from "../../src/contexts/ThemeContext";
import createApi from "../../src/services/api";

const CATEGORIES = [
  "Seminar",
  "Workshop",
  "Lomba",
  "Webinar",
  "Seminar Kerja Praktik",
  "Seminar Proposal",
  "Sidang Terbuka",
];
>>>>>>> 05f503674eab4be9f8ec0ddaf93031ef7567919c

export default function AddEvent() {
  const { theme } = useTheme();
  const router = useRouter();
<<<<<<< HEAD

=======
  const { token } = useAuth();
  const { theme } = useTheme();
  const api = createApi(token);

  const [category, setCategory] = useState("");
>>>>>>> 05f503674eab4be9f8ec0ddaf93031ef7567919c
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const [eventDate, setEventDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [startTime, setStartTime] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);

  const [endTime, setEndTime] = useState(new Date());
  const [showEndPicker, setShowEndPicker] = useState(false);

<<<<<<< HEAD
  const [description, setDescription] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");

  const [showDropdown, setShowDropdown] = useState(false);

  const formatDateForDB = (date) => date.toISOString().split("T")[0];

  const formatTimeForDB = (t) =>
  t.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });


  const resetForm = () => {
    setTitle("");
    setCategory("");
    setLocation("");
    setDescription("");
    setEventDate(new Date());
    setStartTime(new Date());
    setEndTime(new Date());
    setMaxParticipants("");
  };
=======
  // FUNGSI BARU: Reset semua form ke kondisi awal
  const resetForm = () => {
    setCategory("");
    setTitle("");
    setDate(new Date());
    setStartTime(new Date());
    setEndTime(new Date());
    setLocation("");
    setDescription("");
    setPrice("");
  };

  const formatRupiah = (value) => {
    if (!value) return "";
    return "Rp. " + value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handlePriceChange = (text) => {
    // Buang "Rp", titik, koma, spasi, dan karakter lain
    const cleaned = text.replace(/[^0-9]/g, "");

    // Bisa hapus sampai habis
    setPrice(cleaned);
  };

  const formatDate = () => {
    const d = date.getDate().toString().padStart(2, "0");
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
  };
  
  const formatDateForAPI = () => date.toISOString().split("T")[0];
  
  const formatTime = (t) =>
    t.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
>>>>>>> 05f503674eab4be9f8ec0ddaf93031ef7567919c

  const handleSubmit = async () => {
    try {
      if (!title || !category || !location || !eventDate || !startTime || !endTime || !description || !maxParticipants) {
        Alert.alert("Peringatan", "Semua field wajib diisi.");
        return;
      }

      const payload = {
        title,
        category,
<<<<<<< HEAD
        event_date: formatDateForAPI(eventDate),
=======
        date: formatDateForAPI(),
>>>>>>> 05f503674eab4be9f8ec0ddaf93031ef7567919c
        start_time: formatTime(startTime),
        end_time: formatTime(endTime),
        location,
        description,
        max_participants: maxParticipants,
      };

<<<<<<< HEAD
      const { data, error } = await supabase.from("events").insert(payload).select();

      if (error) throw error;

      Toast.show({
        type: "success",
        text1: "Event berhasil ditambahkan!",
      });

      resetForm();
      router.replace("/(admin)");

=======
      await api.post("/events", payload);
      Toast.show({ type: "success", text1: "Event berhasil ditambahkan" });
      
      // TAMBAHAN: Reset form setelah berhasil
      resetForm();
      
      setTimeout(() => router.replace("/(admin)"), 800);
>>>>>>> 05f503674eab4be9f8ec0ddaf93031ef7567919c
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Gagal menambahkan event",
        text2: err.message,
      });
    }
  };

  return (
<<<<<<< HEAD
    <View style={{backgroundColor: theme.background, flex:1}}>
=======
    <View style={{ flex: 1, backgroundColor: theme.background }}>
>>>>>>> 05f503674eab4be9f8ec0ddaf93031ef7567919c
      {/* HEADER */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingTop: 50,
          paddingBottom: 30,
          backgroundColor: theme.primary,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          shadowColor: theme.shadow,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.3,
          shadowRadius: 10,
          elevation: 10,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 22, fontWeight: "bold", color: "#FFFFFF" }}>
            Tambah Event
          </Text>
          <Text style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", marginTop: 4 }}>
            Isi semua detail event baru
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            padding: 10,
            backgroundColor: "rgba(255,255,255,0.2)",
            borderRadius: 12,
          }}
        >
          <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

<<<<<<< HEAD
      <ScrollView style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}>
        {/* Form Inputs */}
        <View style={{ backgroundColor: theme.card,
=======
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* FORM CARD */}
        <View
          style={{
            backgroundColor: theme.card,
>>>>>>> 05f503674eab4be9f8ec0ddaf93031ef7567919c
            padding: 20,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: theme.border,
            shadowColor: theme.shadow,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
<<<<<<< HEAD
            elevation: 4, }}>
          
=======
            elevation: 4,
          }}
        >
>>>>>>> 05f503674eab4be9f8ec0ddaf93031ef7567919c
          {/* JUDUL EVENT */}
          <View style={{ marginBottom: 20 }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
              <View
                style={{
                  backgroundColor: theme.primaryLight,
                  padding: 6,
                  borderRadius: 8,
                  marginRight: 8,
                }}
              >
                <MaterialIcons name="title" size={18} color={theme.primary} />
              </View>
              <Text style={{ fontWeight: "600", fontSize: 15, color: theme.text }}>
                Judul Event
              </Text>
            </View>
            <TextInput
              style={{
                borderWidth: 2,
                borderColor: title ? theme.primary : theme.border,
                padding: 14,
                borderRadius: 12,
                backgroundColor: theme.background,
                color: theme.text,
                fontSize: 15,
              }}
<<<<<<< HEAD
              placeholder="Masukkan Judul Event"
=======
              placeholder="Masukkan judul event..."
>>>>>>> 05f503674eab4be9f8ec0ddaf93031ef7567919c
              placeholderTextColor={theme.textSecondary}
              value={title}
              onChangeText={setTitle}
            />
          </View>

          {/* KATEGORI */}
          <View style={{ marginBottom: 20 }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
              <View
                style={{
                  backgroundColor: theme.primaryLight,
                  padding: 6,
                  borderRadius: 8,
                  marginRight: 8,
                }}
<<<<<<< HEAD
              >
                <MaterialIcons name="category" size={18} color={theme.primary} />
              </View>
              <Text style={{ fontWeight: "600", fontSize: 15, color: theme.text }}>
                Kategori Event
              </Text>
            </View>
            <View style={{
                  padding: 6,
                  borderRadius: 12,
                  backgroundColor: theme.background,
                  color: theme.text,
                  fontSize: 15,
                  width: "100%",
                  borderWidth: 2,
                  borderColor: category ? theme.primary : theme.border,
                }}
              
            >
              <Picker
                selectedValue={category}
                onValueChange={(val) => setCategory(val)}
                style={{
                  flex: 1,
                  height: 52,
                  color: theme.text,
                }}
                dropdownIconColor={theme.textSecondary} // untuk Android
              >
                <Picker.Item label="Pilih Kategori" value="" />
                <Picker.Item label="Lomba" value="Lomba" />
                <Picker.Item label="Webinar" value="Webinar" />
                <Picker.Item label="Seminar" value="Seminar" />
                <Picker.Item label="Workshop" value="Workshop" />
                <Picker.Item label="Sidang Terbuka" value="Sidang Terbuka" />
                <Picker.Item label="Seminar Proposal" value="Seminar Proposal" />
                <Picker.Item label="Seminar Kerja Praktik" value="Seminar Kerja Praktik" />
              </Picker>
            </View>
          </View>

          {/* TANGGAL EVENT */}
          <View style={{ marginBottom: 20 }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
              <View
                style={{
                  backgroundColor: theme.primaryLight,
                  padding: 6,
                  borderRadius: 8,
                  marginRight: 8,
                }}
              >
                <MaterialIcons name="event" size={18} color={theme.primary} />
              </View>
              <Text style={{ fontWeight: "600", fontSize: 15, color: theme.text }}>
                Tanggal Event
              </Text>
            </View>

            <TouchableOpacity
              style={{
                borderWidth: 2,
                borderColor: eventDate ? theme.primary : theme.border,
                padding: 14,
                borderRadius: 12,
                backgroundColor: theme.background,
                color : theme.text,
                fontSize: 15,
              }}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={{ color: theme.text, fontSize: 15 }}>
                {eventDate.toLocaleDateString("id-ID")}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={eventDate}
                mode="date"
                onChange={(e, selected) => {
                  setShowDatePicker(false);
                  if (selected) setEventDate(selected);
                }}
              />
            )}
          </View>

          {/* WAKTU EVENT */}
          <View style={{ marginBottom: 20 }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
              <View
                style={{
                  backgroundColor: theme.primaryLight,
                  padding: 6,
                  borderRadius: 8,
                  marginRight: 8,
                }}
              >
                <MaterialIcons name="access-time" size={18} color={theme.primary} />
              </View>
              <Text style={{ fontWeight: "600", fontSize: 15, color: theme.text }}>
                Waktu Event
              </Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              {/* START TIME */}
              <TouchableOpacity
                style={{
                  flex: 1,
                  borderWidth: 2,
                  borderColor: startTime? theme.primary : theme.border,
                  padding: 14,
                  borderRadius: 12,
                  backgroundColor: theme.background,
                }}
                onPress={() => setShowStartPicker(true)}
              >
                <Text style={{ color: theme.text }}>
                  {formatTimeForDB(startTime)}
                </Text>
              </TouchableOpacity>

              {/* STRIP "-" */}
              <Text style={{ marginHorizontal: 10, marginVertical:10, fontSize: 18, color: theme.text }}>
                —
              </Text>

              {/* END TIME */}
              <TouchableOpacity
                style={{
                  flex: 1,
                  borderWidth: 2,
                  borderColor: endTime ? theme.primary : theme.border,
                  padding: 14,
                  borderRadius: 12,
                  backgroundColor: theme.background,
                }}
                onPress={() => setShowEndPicker(true)}
              >
                <Text style={{ color: theme.text }}>
                  {formatTimeForDB(endTime)}
                </Text>
              </TouchableOpacity>
            </View>

            {showStartPicker && (
              <DateTimePicker
                value={startTime}
                mode="time"
                is24Hour
                onChange={(e, selected) => {
                  setShowStartPicker(false);
                  if (selected) setStartTime(selected);
                }}
              />
            )}

            {showEndPicker && (
              <DateTimePicker
                value={endTime}
                mode="time"
                is24Hour
                onChange={(e, selected) => {
                  setShowEndPicker(false);
                  if (selected) setEndTime(selected);
                }}
              />
            )}
          </View>

=======
              >
                <MaterialIcons name="category" size={18} color={theme.primary} />
              </View>
              <Text style={{ fontWeight: "600", fontSize: 15, color: theme.text }}>
                Kategori Event
              </Text>
            </View>

            {Platform.OS === "web" ? (
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  padding: 14,
                  borderRadius: 12,
                  border: `2px solid ${category ? theme.primary : theme.border}`,
                  backgroundColor: theme.background,
                  color: theme.text,
                  fontSize: 15,
                  width: "100%",
                }}
              >
                <option value="">Pilih kategori</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            ) : (
              <>
                <TouchableOpacity
                  style={{
                    borderWidth: 2,
                    borderColor: category ? theme.primary : theme.border,
                    padding: 14,
                    borderRadius: 12,
                    backgroundColor: theme.background,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  onPress={() => setCategory(category === "" ? CATEGORIES[0] : "")}
                >
                  <Text style={{ color: category ? theme.text : theme.textSecondary, fontSize: 15 }}>
                    {category || "Pilih kategori"}
                  </Text>
                  <MaterialIcons 
                    name="arrow-drop-down" 
                    size={24} 
                    color={theme.textSecondary} 
                  />
                </TouchableOpacity>

                {category === "" && (
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: theme.border,
                      borderRadius: 12,
                      overflow: "hidden",
                      marginTop: 8,
                      backgroundColor: theme.card,
                    }}
                  >
                    {CATEGORIES.map((cat, idx) => (
                      <TouchableOpacity
                        key={cat}
                        style={{
                          padding: 14,
                          backgroundColor: theme.background,
                          borderBottomWidth: idx < CATEGORIES.length - 1 ? 1 : 0,
                          borderColor: theme.border,
                        }}
                        onPress={() => setCategory(cat)}
                      >
                        <Text style={{ color: theme.text }}>{cat}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </>
            )}
          </View>

          {/* TANGGAL */}
          <View style={{ marginBottom: 20 }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
              <View
                style={{
                  backgroundColor: theme.primaryLight,
                  padding: 6,
                  borderRadius: 8,
                  marginRight: 8,
                }}
              >
                <MaterialIcons name="event" size={18} color={theme.primary} />
              </View>
              <Text style={{ fontWeight: "600", fontSize: 15, color: theme.text }}>
                Tanggal Event
              </Text>
            </View>

            {Platform.OS === "web" ? (
              <input
                type="date"
                value={formatDateForAPI()}
                onChange={(e) => setDate(new Date(e.target.value))}
                style={{
                  padding: 14,
                  borderRadius: 12,
                  border: `2px solid ${theme.primary}`,
                  backgroundColor: theme.background,
                  color: theme.text,
                  fontSize: 15,
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
            ) : (
              <>
                <TouchableOpacity
                  style={{
                    borderWidth: 2,
                    borderColor: theme.primary,
                    padding: 14,
                    borderRadius: 12,
                    backgroundColor: theme.background,
                  }}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text style={{ color: theme.text, fontSize: 15 }}>{formatDate()}</Text>
                </TouchableOpacity>

                {showDatePicker && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    onChange={(e, selected) => {
                      setShowDatePicker(false);
                      if (selected) setDate(selected);
                    }}
                  />
                )}
              </>
            )}
          </View>

          {/* WAKTU */}
          <View style={{ marginBottom: 20 }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
              <View
                style={{
                  backgroundColor: theme.primaryLight,
                  padding: 6,
                  borderRadius: 8,
                  marginRight: 8,
                }}
              >
                <MaterialIcons name="access-time" size={18} color={theme.primary} />
              </View>
              <Text style={{ fontWeight: "600", fontSize: 15, color: theme.text }}>
                Waktu Event
              </Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ flex: 1 }}>
                {Platform.OS === "web" ? (
                  <input
                    type="time"
                    value={formatTime(startTime)}
                    onChange={(e) =>
                      setStartTime(new Date(`1970-01-01T${e.target.value}`))
                    }
                    style={{
                      padding: 14,
                      borderRadius: 12,
                      border: `2px solid ${theme.primary}`,
                      backgroundColor: theme.background,
                      color: theme.text,
                      fontSize: 15,
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  />
                ) : (
                  <>
                    <TouchableOpacity
                      style={{
                        borderWidth: 2,
                        borderColor: theme.primary,
                        padding: 14,
                        borderRadius: 12,
                        backgroundColor: theme.background,
                      }}
                      onPress={() => setShowStartPicker(true)}
                    >
                      <Text style={{ color: theme.text, fontSize: 15 }}>
                        {formatTime(startTime)}
                      </Text>
                    </TouchableOpacity>

                    {showStartPicker && (
                      <DateTimePicker
                        value={startTime}
                        mode="time"
                        is24Hour
                        onChange={(e, selected) => {
                          setShowStartPicker(false);
                          if (selected) setStartTime(selected);
                        }}
                      />
                    )}
                  </>
                )}
              </View>

              <View
                style={{
                  marginHorizontal: 12,
                  backgroundColor: theme.primaryLight,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 8,
                }}
              >
                <MaterialIcons name="arrow-forward" size={20} color={theme.primary} />
              </View>

              <View style={{ flex: 1 }}>
                {Platform.OS === "web" ? (
                  <input
                    type="time"
                    value={formatTime(endTime)}
                    onChange={(e) =>
                      setEndTime(new Date(`1970-01-01T${e.target.value}`))
                    }
                    style={{
                      padding: 14,
                      borderRadius: 12,
                      border: `2px solid ${theme.primary}`,
                      backgroundColor: theme.background,
                      color: theme.text,
                      fontSize: 15,
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  />
                ) : (
                  <>
                    <TouchableOpacity
                      style={{
                        borderWidth: 2,
                        borderColor: theme.primary,
                        padding: 14,
                        borderRadius: 12,
                        backgroundColor: theme.background,
                      }}
                      onPress={() => setShowEndPicker(true)}
                    >
                      <Text style={{ color: theme.text, fontSize: 15 }}>
                        {formatTime(endTime)}
                      </Text>
                    </TouchableOpacity>

                    {showEndPicker && (
                      <DateTimePicker
                        value={endTime}
                        mode="time"
                        is24Hour
                        onChange={(e, selected) => {
                          setShowEndPicker(false);
                          if (selected) setEndTime(selected);
                        }}
                      />
                    )}
                  </>
                )}
              </View>
            </View>
          </View>

>>>>>>> 05f503674eab4be9f8ec0ddaf93031ef7567919c
          {/* LOKASI */}
          <View style={{ marginBottom: 20 }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
              <View
                style={{
                  backgroundColor: theme.primaryLight,
                  padding: 6,
                  borderRadius: 8,
                  marginRight: 8,
                }}
              >
<<<<<<< HEAD
                <Entypo name="location" size={18} color={theme.primary} />
              </View>
              <Text style={{ fontWeight: "600", fontSize: 15, color: theme.text }}>
                Lokasi Event
              </Text>
            </View>
            <View style={{
                  padding: 6,
                  borderRadius: 12,
                  backgroundColor: theme.background,
                  color: theme.text,
                  fontSize: 15,
                  width: "100%",
                  borderWidth: 2,
                  borderColor: location ? theme.primary : theme.border,
                }}
              
            >
              <Picker
                selectedValue={location}
                onValueChange={(val) => setLocation(val)}
                style={{
                  flex: 1,
                  height: 52,
                  color: theme.text,
                }}
                dropdownIconColor={theme.textSecondary} // untuk Android
              >
                <Picker.Item label="Pilih Lokasi Event" value="" />
                <Picker.Item label="Ruang C Jurusan Informatika" value="Ruang C Jurusan Informatika" />
                <Picker.Item label="Ruang D Jurusan Informatika" value="Ruang D Jurusan Informatika" />
                <Picker.Item label="Ruang Sidang Jurusan Informatika" value="Ruang Sidang Jurusan Informatika" />
                <Picker.Item label="Aula Fakultas Teknik" value="Aula Fakultas Teknik" />
                <Picker.Item label="Auditorium Universitas Tanjungpura" value="Auditorium Universitas Tanjungpura" />
                <Picker.Item label="Gedung Konferensi Ruang Teater 1" value="Gedung Konferensi Ruang Teater 1" />
                <Picker.Item label="Gedung Konferensi Ruang Teater 2" value="Gedung Konferensi Ruang Teater 2" />
                <Picker.Item label="Gedung Konferensi Ruang Teater 3" value="Gedung Konferensi Ruang Teater 1" />
                <Picker.Item label="Gedung Konferensi Ruang E-Learning 5" value="Gedung Konferensi Ruang E-Learning 5" />
              </Picker>
            </View>
=======
                <MaterialIcons name="place" size={18} color={theme.primary} />
              </View>
              <Text style={{ fontWeight: "600", fontSize: 15, color: theme.text }}>
                Lokasi
              </Text>
            </View>
            <TextInput
              style={{
                borderWidth: 2,
                borderColor: location ? theme.primary : theme.border,
                padding: 14,
                borderRadius: 12,
                backgroundColor: theme.background,
                color: theme.text,
                fontSize: 15,
              }}
              placeholder="Masukkan lokasi event..."
              placeholderTextColor={theme.textSecondary}
              value={location}
              onChangeText={setLocation}
            />
>>>>>>> 05f503674eab4be9f8ec0ddaf93031ef7567919c
          </View>

          {/* DESKRIPSI */}
          <View style={{ marginBottom: 20 }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
              <View
                style={{
                  backgroundColor: theme.primaryLight,
                  padding: 6,
                  borderRadius: 8,
                  marginRight: 8,
                }}
              >
                <MaterialIcons name="description" size={18} color={theme.primary} />
              </View>
              <Text style={{ fontWeight: "600", fontSize: 15, color: theme.text }}>
                Deskripsi
              </Text>
            </View>
            <TextInput
              style={{
                borderWidth: 2,
                borderColor: description ? theme.primary : theme.border,
                padding: 14,
                borderRadius: 12,
                backgroundColor: theme.background,
                color: theme.text,
                fontSize: 15,
                height: 100,
                textAlignVertical: "top",
              }}
<<<<<<< HEAD
              placeholder="Masukkan Deskripsi Event"
=======
              placeholder="Masukkan deskripsi event..."
>>>>>>> 05f503674eab4be9f8ec0ddaf93031ef7567919c
              placeholderTextColor={theme.textSecondary}
              multiline
              value={description}
              onChangeText={setDescription}
            />
          </View>

<<<<<<< HEAD
          {/* Maksimal Peserta */}
=======
          {/* HARGA */}
>>>>>>> 05f503674eab4be9f8ec0ddaf93031ef7567919c
          <View style={{ marginBottom: 20 }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
              <View
                style={{
<<<<<<< HEAD
                  backgroundColor: theme.primaryLight,
=======
                  backgroundColor: theme.successLight,
>>>>>>> 05f503674eab4be9f8ec0ddaf93031ef7567919c
                  padding: 6,
                  borderRadius: 8,
                  marginRight: 8,
                }}
              >
<<<<<<< HEAD
                <MaterialIcons name="person" size={18} color={theme.primary} />
              </View>
              <Text style={{ fontWeight: "600", fontSize: 15, color: theme.text }}>
                Maksimal Peserta
=======
                <MaterialIcons name="attach-money" size={18} color={theme.success} />
              </View>
              <Text style={{ fontWeight: "600", fontSize: 15, color: theme.text }}>
                Harga Tiket
>>>>>>> 05f503674eab4be9f8ec0ddaf93031ef7567919c
              </Text>
            </View>
            <TextInput
              style={{
                borderWidth: 2,
<<<<<<< HEAD
                borderColor: maxParticipants ? theme.primary : theme.border,
=======
                borderColor: price ? theme.success : theme.border,
>>>>>>> 05f503674eab4be9f8ec0ddaf93031ef7567919c
                padding: 14,
                borderRadius: 12,
                backgroundColor: theme.background,
                color: theme.text,
                fontSize: 15,
              }}
<<<<<<< HEAD
              placeholder="Masukkan Maksimal Jumlah Peserta"
              placeholderTextColor={theme.textSecondary}
              keyboardType="numeric"
              value={maxParticipants}
              onChangeText={setMaxParticipants}
=======
              placeholder="Masukkan harga"
              placeholderTextColor={theme.textSecondary}
              keyboardType="numeric"
              value={price ? formatRupiah(price) : ""}
              onChangeText={handlePriceChange}
>>>>>>> 05f503674eab4be9f8ec0ddaf93031ef7567919c
            />
          </View>

          {/* BUTTONS */}
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: theme.success,
                padding: 16,
                borderRadius: 12,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                shadowColor: theme.success,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 4,
              }}
              onPress={handleSubmit}
            >
              <MaterialIcons name="add-circle" size={20} color="#FFFFFF" />
              <Text
                style={{
                  textAlign: "center",
                  color: "#FFFFFF",
                  fontWeight: "700",
                  fontSize: 16,
                  marginLeft: 8,
                }}
              >
                Tambah Event
              </Text>
            </TouchableOpacity>
          </View>
<<<<<<< HEAD

        </View>
      </ScrollView>
      <Toast position="top" topOffset={50} />
    </View>
  );
}
=======
        </View>
      </ScrollView>

      <Toast position="top" topOffset={50} />
    </View>
  );
}
>>>>>>> 05f503674eab4be9f8ec0ddaf93031ef7567919c

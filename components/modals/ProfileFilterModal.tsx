import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export interface FilterOptions {
  sports: string[];
  cities: string[];
  ageRange: { min: number; max: number };
  maxDistance: number;
}

interface ProfileFilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
  currentFilters: FilterOptions;
}

const SPORT_OPTIONS = [
  "CrossFit / CrossTraining",
  "Hyrox",
  "Ironman / Triathlon",
  "Ultra-Trail / Trail running",
  "Marathon / Semi-Marathon",
  "Spartan Race / OCR",
  "Course à pied sur route",
  "Cyclisme",
  "Kitesurf",
  "Boxe / Sports de combat",
  "Natation",
  "Escalade / Alpinisme",
  "Musculation fonctionnelle",
  "Sports aquatiques divers",
  "Autre discipline extrême",
];

const FRENCH_CITIES = [
  "Paris",
  "Marseille",
  "Lyon",
  "Toulouse",
  "Nice",
  "Nantes",
  "Montpellier",
  "Strasbourg",
  "Bordeaux",
  "Lille",
  "Rennes",
  "Reims",
  "Saint-Étienne",
  "Le Havre",
  "Toulon",
  "Grenoble",
  "Dijon",
  "Angers",
  "Nîmes",
  "Villeurbanne",
];

const ProfileFilterModal: React.FC<ProfileFilterModalProps> = ({
  visible,
  onClose,
  onApplyFilters,
  currentFilters,
}) => {
  const [selectedSports, setSelectedSports] = useState<string[]>(
    currentFilters.sports
  );
  const [selectedCities, setSelectedCities] = useState<string[]>(
    currentFilters.cities
  );
  const [ageRange, setAgeRange] = useState(currentFilters.ageRange);
  const [maxDistance, setMaxDistance] = useState(currentFilters.maxDistance);
  const [citySearch, setCitySearch] = useState("");

  useEffect(() => {
    setSelectedSports(currentFilters.sports);
    setSelectedCities(currentFilters.cities);
    setAgeRange(currentFilters.ageRange);
    setMaxDistance(currentFilters.maxDistance);
  }, [currentFilters]);

  const toggleSport = (sport: string) => {
    if (selectedSports.includes(sport)) {
      setSelectedSports(selectedSports.filter((s) => s !== sport));
    } else {
      setSelectedSports([...selectedSports, sport]);
    }
  };

  const toggleCity = (city: string) => {
    if (selectedCities.includes(city)) {
      setSelectedCities(selectedCities.filter((c) => c !== city));
    } else {
      setSelectedCities([...selectedCities, city]);
    }
  };

  const applyFilters = () => {
    const filters: FilterOptions = {
      sports: selectedSports,
      cities: selectedCities,
      ageRange,
      maxDistance,
    };
    onApplyFilters(filters);
    onClose();
  };

  const clearFilters = () => {
    setSelectedSports([]);
    setSelectedCities([]);
    setAgeRange({ min: 18, max: 65 });
    setMaxDistance(100);
  };

  const filteredCities = FRENCH_CITIES.filter((city) =>
    city.toLowerCase().includes(citySearch.toLowerCase())
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <MaterialIcons name="close" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Filtrer les profils</Text>
          <TouchableOpacity onPress={clearFilters} style={styles.clearButton}>
            <Text style={styles.clearText}>Effacer</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Sports Filter */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sports pratiqués</Text>
            <View style={styles.tagContainer}>
              {SPORT_OPTIONS.map((sport) => (
                <TouchableOpacity
                  key={sport}
                  style={[
                    styles.tag,
                    selectedSports.includes(sport) && styles.selectedTag,
                  ]}
                  onPress={() => toggleSport(sport)}
                >
                  <Text
                    style={[
                      styles.tagText,
                      selectedSports.includes(sport) && styles.selectedTagText,
                    ]}
                  >
                    {sport}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Location Filter */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Villes</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher une ville..."
              placeholderTextColor="#888"
              value={citySearch}
              onChangeText={setCitySearch}
            />
            <View style={styles.tagContainer}>
              {filteredCities.map((city) => (
                <TouchableOpacity
                  key={city}
                  style={[
                    styles.tag,
                    selectedCities.includes(city) && styles.selectedTag,
                  ]}
                  onPress={() => toggleCity(city)}
                >
                  <Text
                    style={[
                      styles.tagText,
                      selectedCities.includes(city) && styles.selectedTagText,
                    ]}
                  >
                    {city}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Age Range Filter */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tranche d&apos;âge</Text>
            <View style={styles.ageContainer}>
              <View style={styles.ageInput}>
                <Text style={styles.ageLabel}>Min</Text>
                <TextInput
                  style={styles.ageTextInput}
                  value={ageRange.min.toString()}
                  onChangeText={(text) =>
                    setAgeRange({ ...ageRange, min: parseInt(text) || 18 })
                  }
                  keyboardType="numeric"
                  maxLength={2}
                />
              </View>
              <Text style={styles.ageSeparator}>-</Text>
              <View style={styles.ageInput}>
                <Text style={styles.ageLabel}>Max</Text>
                <TextInput
                  style={styles.ageTextInput}
                  value={ageRange.max.toString()}
                  onChangeText={(text) =>
                    setAgeRange({ ...ageRange, max: parseInt(text) || 65 })
                  }
                  keyboardType="numeric"
                  maxLength={2}
                />
              </View>
            </View>
          </View>

          {/* Distance Filter */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Distance maximale: {maxDistance} km
            </Text>
            <View style={styles.distanceContainer}>
              <TouchableOpacity
                style={styles.distanceButton}
                onPress={() => setMaxDistance(Math.max(10, maxDistance - 10))}
              >
                <MaterialIcons name="remove" size={20} color="white" />
              </TouchableOpacity>
              <Text style={styles.distanceValue}>{maxDistance} km</Text>
              <TouchableOpacity
                style={styles.distanceButton}
                onPress={() => setMaxDistance(Math.min(500, maxDistance + 10))}
              >
                <MaterialIcons name="add" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Apply Button */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
            <Text style={styles.applyButtonText}>Appliquer les filtres</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  closeButton: {
    padding: 8,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  clearButton: {
    padding: 8,
  },
  clearText: {
    color: "#D32C1C",
    fontSize: 16,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 15,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  tag: {
    backgroundColor: "#333",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#444",
  },
  selectedTag: {
    backgroundColor: "#D32C1C",
    borderColor: "#D32C1C",
  },
  tagText: {
    color: "#ccc",
    fontSize: 14,
  },
  selectedTagText: {
    color: "white",
    fontWeight: "600",
  },
  searchInput: {
    backgroundColor: "#333",
    color: "white",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  ageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  ageInput: {
    alignItems: "center",
  },
  ageLabel: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 8,
  },
  ageTextInput: {
    backgroundColor: "#333",
    color: "white",
    textAlign: "center",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    width: 60,
  },
  ageSeparator: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  distanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  distanceButton: {
    backgroundColor: "#D32C1C",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  distanceValue: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    minWidth: 80,
    textAlign: "center",
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  applyButton: {
    backgroundColor: "#D32C1C",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  applyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileFilterModal;

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
    <section class="max-w-6xl mx-auto px-4 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <p class="inline-block bg-blue-100 text-blue-700 font-semibold px-4 py-2 rounded-full mb-5">
            Student communities
          </p>

          <h1 class="text-5xl font-bold text-blue-900 mb-5 leading-tight">
            Find your study abroad circle.
          </h1>

          <p class="text-lg text-gray-700 leading-relaxed max-w-xl">
            Join focused communities based on countries, scholarships, study fields, and student life topics.
          </p>
        </div>

        <div class="bg-white/70 rounded-2xl shadow-lg p-6">
          <div class="community-hero-image"></div>
        </div>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-4 -mt-4 mb-8">
      <div class="bg-white rounded-xl shadow-lg p-6">
        <div class="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
          <input
            v-model="searchInput"
            placeholder="Search communities, e.g. Germany, scholarships, nursing..."
            class="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            @click="showCreateForm = !showCreateForm"
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-lg"
          >
            {{ showCreateForm ? 'Close' : '+ Create Community' }}
          </button>
        </div>
      </div>
    </section>

    <section v-if="showCreateForm" class="max-w-6xl mx-auto px-4 mb-8">
      <div class="bg-white rounded-xl shadow-lg p-8">
        <h2 class="text-2xl font-bold text-blue-900 mb-5">Create a Community</h2>

        <form @submit.prevent="createCommunity">
          <input
            v-model="newCommunityName"
            placeholder="Community name, e.g. Study in Germany"
            class="input"
          />

          <textarea
            v-model="newCommunityDescription"
            rows="4"
            placeholder="What is this community about?"
            class="input"
          ></textarea>

          <select v-model="newCommunityCategory" class="input">
            <option value="">Choose category</option>
            <option>Country</option>
            <option>Scholarships</option>
            <option>University Applications</option>
            <option>Visa</option>
            <option>Student Life</option>
            <option>Career</option>
          </select>

          <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg">
            Create Community
          </button>
        </form>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-4 pb-16">
      <div class="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-6">
        <aside class="bg-white rounded-xl shadow-lg p-5 h-fit">
          <h3 class="font-bold text-blue-900 mb-4">Categories</h3>

          <ul class="space-y-3 text-sm">
            <li
              v-for="category in categories"
              :key="category"
              @click="selectedCategory = category"
              :class="[
                'category',
                selectedCategory === category ? 'active' : ''
              ]"
            >
              {{ category }}
            </li>
          </ul>
        </aside>

        <main>
          <div class="flex justify-between items-center mb-5">
            <h2 class="text-2xl font-bold text-blue-900">
              Communities
            </h2>

            <p class="text-sm text-gray-500">
              {{ filteredCommunities.length }} found
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="community in filteredCommunities"
              :key="community.id"
              class="bg-white rounded-xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition"
            >
              <div class="flex items-start justify-between gap-4 mb-4">
                <div class="community-icon">
                  {{ getInitial(community.name) }}
                </div>

                <span class="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                  {{ community.category }}
                </span>
              </div>

              <h3 class="text-xl font-bold text-blue-900 mb-2">
                {{ community.name }}
              </h3>

              <p class="text-gray-600 mb-4">
                {{ community.description }}
              </p>

              <p class="text-sm text-gray-500 mb-5">
                {{ community.members }} members
              </p>

              <div class="flex gap-3">
                <button
                  @click="toggleJoin(community)"
                  :class="[
                    'font-bold px-5 py-2 rounded-lg transition',
                    community.joined
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  ]"
                >
                  {{ community.joined ? 'Joined' : 'Join' }}
                </button>

                <button @click="viewThreads(community)">
  View Community
</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

interface Community {
  id: number;
  name: string;
  description: string;
  category: string;
  members: number;
  joined: boolean;
}

const router = useRouter();

const searchInput = ref("");
const selectedCategory = ref("All");
const showCreateForm = ref(false);

const newCommunityName = ref("");
const newCommunityDescription = ref("");
const newCommunityCategory = ref("");

const categories = [
  "All",
  "Country",
  "Scholarships",
  "University Applications",
  "Visa",
  "Student Life",
  "Career",
];

const communities = ref<Community[]>([
  {
    id: 1,
    name: "Study in Germany",
    description: "For students applying to German universities, Ausbildung, scholarships, and student visas.",
    category: "Country",
    members: 1240,
    joined: false,
  },
  {
    id: 2,
    name: "Scholarship Seekers",
    description: "Share scholarship opportunities, tips, deadlines, and application advice.",
    category: "Scholarships",
    members: 980,
    joined: true,
  },
  {
    id: 3,
    name: "International Nursing Students",
    description: "A space for nursing students planning to study or work abroad.",
    category: "Career",
    members: 430,
    joined: false,
  },
  {
    id: 4,
    name: "Visa Support Circle",
    description: "Ask questions about visa documents, appointments, and embassy processes.",
    category: "Visa",
    members: 760,
    joined: false,
  },
  {
    id: 5,
    name: "University Applications",
    description: "Help with SOPs, documents, application portals, and admission requirements.",
    category: "University Applications",
    members: 690,
    joined: false,
  },
]);

const filteredCommunities = computed(() => {
  const query = searchInput.value.toLowerCase();

  return communities.value.filter((community) => {
    const matchesSearch =
      community.name.toLowerCase().includes(query) ||
      community.description.toLowerCase().includes(query) ||
      community.category.toLowerCase().includes(query);

    const matchesCategory =
      selectedCategory.value === "All" ||
      community.category === selectedCategory.value;

    return matchesSearch && matchesCategory;
  });
});

const getInitial = (name: string) => {
  return name.charAt(0).toUpperCase();
};

const toggleJoin = (community: Community) => {
  community.joined = !community.joined;
  community.members += community.joined ? 1 : -1;
};

const createCommunity = () => {
  if (
    !newCommunityName.value.trim() ||
    !newCommunityDescription.value.trim() ||
    !newCommunityCategory.value
  ) {
    alert("Please fill in the name, description, and category.");
    return;
  }

  communities.value.unshift({
    id: Date.now(),
    name: newCommunityName.value,
    description: newCommunityDescription.value,
    category: newCommunityCategory.value,
    members: 1,
    joined: true,
  });

  newCommunityName.value = "";
  newCommunityDescription.value = "";
  newCommunityCategory.value = "";
  showCreateForm.value = false;
};

const viewThreads = (community: Community) => {
  router.push(`/community/${community.id}`);
};
</script>

<style scoped>
.community-hero-image {
  min-height: 280px;
  border-radius: 20px;
  background:
    linear-gradient(rgba(239, 246, 255, 0.15), rgba(239, 246, 255, 0.15)),
    url("../images/community-hero.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  outline: none;
  margin-bottom: 16px;
}

.input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px #bfdbfe;
}

.category {
  color: #475569;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
}

.category.active,
.category:hover {
  background: #eff6ff;
  color: #2563eb;
  font-weight: 700;
}

.community-icon {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: #dbeafe;
  color: #2563eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 24px;
}
</style>
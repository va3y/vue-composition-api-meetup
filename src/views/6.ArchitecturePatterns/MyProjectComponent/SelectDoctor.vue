<template>
  <BasicStepsLayout>
    <template>
      <div class="flex flex-col w-full h-full bg-field-light">
        <BackButton @click="onBackButtonClick"> text </BackButton>
        <TimeSlotFilters
          v-if="!authStepsComponent || isMobile"
          v-model:selectedMonth="selectedMonth"
          v-model:selectedReason="selectedReason"
          :appointment-reasons="appointmentReasons"
          @update:selectedMonth="currentStartingDay = $event"
        />
        <UiScrollbar
          v-show="showStructureDetails"
          thin
          class="flex-1 mt-5 md:mx-2 h-full"
          view-class="md:pb-5 md:px-8 h-full"
        >
          <div
            class="flex flex-col"
            :class="{ 'h-full justify-between ': showQuestionarireLink }"
          >
            <StructureListItem
              :collapsible="showQuestionarireLink"
              expanded
              :structure="selectedStructure"
            >
            </StructureListItem>
            <transition name="slide-top">
              <QuestionaireLink
                v-show="showQuestionarireLink"
                class="hidden md:flex pb-16"
              />
            </transition>
          </div>
        </UiScrollbar>
      </div>
    </template>
    <template>
      <transition name="fade-in">
        <UiScrollbar
          v-if="!authStepsComponent || isMobile"
          v-show="showTimeSlots && !loadingDoctors"
          thin
          class="h-full md:mr-2"
          view-class="flex flex-col items-center w-full px-6 py-9"
        >
          <div
            v-for="doctor in doctors"
            :key="doctor?.Id"
            class="w-full border-b border-field last:border-0"
          >
            <DoctorTimeSlots
              v-model:selected-month="selectedMonth"
              :doctor="doctor"
              :current-days="currentDays"
              @update:current-starting-day="currentStartingDay = $event"
              @select-slot="onSelectSlot"
              @to-next-week="changePage(1)"
              @to-last-week="changePage(-1)"
            />
          </div>
        </UiScrollbar>
      </transition>
      <LoadingSpinner v-show="loadingDoctors && showTimeSlots" />
      <MobileModalStepsLayout v-model="showMobileStepsLayout">
        <AuthSteps
          v-model:current-component="authStepsComponent"
          :reason-id="selectedReason"
          :reason-name="selectedReasonName"
          :selected-time-slot="selectedTimeSlot"
          :selected-structure="selectedStructure"
          :selected-doctor="selectedDoctor"
          :show-questionarire-link="showQuestionarireLink"
          @close="$emit('close')"
        />
      </MobileModalStepsLayout>
    </template>
  </BasicStepsLayout>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import BackButton from "@/components/particles/common/BackButton.vue";
import BasicStepsLayout from "../layout/BasicStepsLayout.vue";
import DoctorTimeSlots from "./DoctorTimeSlots.vue";
import TimeSlotFilters from "./TimeSlotFilters.vue";
import StructureListItem from "../FindStructure/StructureListItem.vue";
import LoadingSpinner from "@/components/particles/common/LoadingSpinner.vue";
import MobileModalStepsLayout from "@/components/particles/CreateAppointmentModal/layout/MobileModalStepsLayout.vue";
import AuthSteps from "@/components/particles/CreateAppointmentModal/AuthSteps.vue";
import useCalendarLogic from "./calendarLogic";
import useLoadDoctors from "./loadDoctors";
import useAuthSteps from "./authSteps";
import QuestionaireLink from "../Done/QuestionaireLink.vue";

export default defineComponent({
  components: {
    BackButton,
    BasicStepsLayout,
    DoctorTimeSlots,
    StructureListItem,
    MobileModalStepsLayout,
    TimeSlotFilters,
    AuthSteps,
    LoadingSpinner,
    QuestionaireLink,
  },
  props: {
    selectedStructure: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  emits: ["change-component", "close"],
  /* На мой взгляд такие сетапы все рано надо писать, вместо 
  return {
    ...useAuthSteps()
    и т.д...
  }
  Чтобы иметь возможноть менять названия переменных если они совпадают в двух фичах
  */
  setup(props, ctx) {
    const { changePage, currentDays, selectedMonth, currentStartingDay } =
      useCalendarLogic();

    const {
      onCloseStructureDetails,
      showTimeSlots,
      showStructureDetails,
      onSelectSlot,
      onBackButtonClick,
      showMobileStepsLayout,
      authStepsComponent,
      isMobile,
      selectedTimeSlot,
      selectedDoctor,
      showQuestionarireLink,
    } = useAuthSteps(ctx);

    const {
      selectedReason,
      selectedReasonName,
      doctors,
      appointmentReasons,
      loadingDoctors,
    } = useLoadDoctors(props.selectedStructure.Id, authStepsComponent);

    return {
      selectedMonth,
      selectedReason,
      selectedReasonName,
      onCloseStructureDetails,
      currentDays,
      changePage,
      doctors,
      showTimeSlots,
      currentStartingDay,
      showStructureDetails,
      onSelectSlot,
      onBackButtonClick,
      showMobileStepsLayout,
      authStepsComponent,
      isMobile,
      appointmentReasons,
      loadingDoctors,
      selectedTimeSlot,
      selectedDoctor,
      showQuestionarireLink,
    };
  },
});
</script>

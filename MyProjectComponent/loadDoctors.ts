import useStore from "@/store";
import { API_ACTION_TYPES } from "@/store/api/actions";
import { APPOINTMENT_ACTION_TYPES } from "@/store/appointment/actions";
import { useAsyncState } from "@vueuse/core";
import { ref, watch, Ref, computed, ComputedRef } from "vue";
import { v4 as uuid } from "uuid";
import { useCancelToken } from "@/hooks/useCancelToken";
import { Doctor } from "@/store/appointment/types";

export default function loadDoctors(
  structureId: number,
  authStepsComponent: Ref<string>
): {
  selectedReason: Ref<any>;
  selectedReasonName: ComputedRef<string | undefined>;
  doctors: Ref<Doctor[]>;
  appointmentReasons: typeof appointmentReasons;
  loadingDoctors: Ref<boolean>;
} {
  const store = useStore();
  const selectedReason = ref();
  const loadingDoctors = ref(true);
  const doctors = ref<Doctor[]>([]);
  const getDoctorsRequestId = useCancelToken();

  const appointmentReasons = useAsyncState(
    store
      .dispatch(APPOINTMENT_ACTION_TYPES.GET_APPOINTMENT_REASONS, structureId)
      .then((res) => {
        selectedReason.value = res[0].Id;
        return res;
      }),
    []
  );

  const loadDoctors = async (ReasonId: number) => {
    if (getDoctorsRequestId.value)
      store.dispatch(
        API_ACTION_TYPES.CANCEL_REQUEST,
        getDoctorsRequestId.value
      );
    loadingDoctors.value = true;
    getDoctorsRequestId.value = uuid();
    try {
      doctors.value = await store.dispatch(
        APPOINTMENT_ACTION_TYPES.GET_DOCTORS,
        {
          requestId: getDoctorsRequestId.value,
          StructureId: structureId,
          ReasonId,
        }
      );
      loadingDoctors.value = false;
    } catch (error) {
      console.error(error);
    }
  };

  const selectedReasonName = computed(
    () =>
      appointmentReasons.state.value.find(
        (reason) => reason.Id === selectedReason.value
      )?.Reason
  );

  watch(
    () => [selectedReason.value, authStepsComponent.value],
    (newVal) => loadDoctors(newVal[0]),
    {
      deep: true,
    }
  );

  return {
    selectedReason,
    selectedReasonName,
    doctors,
    appointmentReasons,
    loadingDoctors,
  };
}

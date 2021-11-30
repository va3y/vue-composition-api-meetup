import { useBreakpoints } from "@/hooks/useBreakpoints";
import dayjs from "dayjs";

import { ref, computed, Ref, ComputedRef, watch } from "vue";

export default function calendarLogic(): {
  changePage: (i: number) => void;
  currentDays: ComputedRef<string[]>;
  selectedMonth: Ref<string>;
  currentStartingDay: Ref<string>;
} {
  const itemsPerPage = useBreakpoints().smaller("lg").value ? 3 : 7;
  const selectedMonth = ref(dayjs().startOf("month").toISOString());
  const currentStartingDay = ref(dayjs().toISOString());

  const currentDays = computed(() => {
    return Array(itemsPerPage)
      .fill(null)
      .map((el, i) =>
        dayjs(currentStartingDay.value).add(i, "day").toISOString()
      );
  });

  const changePage = (i: number): void => {
    const newStartingDay = dayjs(currentStartingDay.value).add(
      itemsPerPage * i,
      "day"
    );
    currentStartingDay.value = newStartingDay.toISOString();
  };

  watch(
    () => currentStartingDay.value,
    (newVal) => {
      const newStartingDay = dayjs(newVal);
      if (
        dayjs(selectedMonth.value).month() !== newStartingDay.month() ||
        dayjs(selectedMonth.value).year() !== newStartingDay.year()
      )
        selectedMonth.value = newStartingDay.startOf("month").toISOString();
    }
  );

  return {
    changePage,
    currentDays,
    selectedMonth,
    currentStartingDay,
  };
}

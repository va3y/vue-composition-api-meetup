import { useBreakpoints } from '@/hooks/useBreakpoints'
import useStore from '@/store'
import { Doctor, TimeSlot } from '@/store/appointment/types'
import { QUESTIONNAIRE_ACTION_TYPES } from '@/store/questionnaire/actions'
import { ref, Ref, SetupContext, watch } from 'vue'

type onSelectSlotArgs = {
  timeSlot: TimeSlot
  doctor: Doctor
}

export default function authSteps({
  emit,
}: SetupContext<('change-component' | 'close')[]>): {
  onCloseStructureDetails: () => void
  showTimeSlots: Ref<boolean>
  showStructureDetails: Ref<boolean>
  onSelectSlot: (arg1: onSelectSlotArgs) => void
  onBackButtonClick: () => void
  showMobileStepsLayout: Ref<boolean>
  authStepsComponent: Ref<string>
  isMobile: Ref<boolean>
  selectedTimeSlot: Ref<null | TimeSlot>
  selectedDoctor: Ref<null | Doctor>
  showQuestionarireLink: Ref<boolean>
} {
  const isMobile = useBreakpoints().smaller('md')
  const store = useStore()

  const showStructureDetails = ref(true)
  const showTimeSlots = ref(!isMobile.value)
  const showMobileStepsLayout = ref(false)
  const authStepsComponent = ref<string>('')
  const selectedTimeSlot = ref<null | TimeSlot>(null)
  const selectedDoctor = ref<null | Doctor>(null)

  const onCloseStructureDetails = () => {
    showStructureDetails.value = false
    showTimeSlots.value = true
  }

  const onSelectSlot = ({ timeSlot, doctor }: onSelectSlotArgs) => {
    authStepsComponent.value = store.getters.isAuthenticated
      ? 'SelectPatient'
      : 'AuthStart'
    selectedTimeSlot.value = timeSlot
    selectedDoctor.value = doctor

    if (isMobile.value) showMobileStepsLayout.value = true
  }

  const onBackButtonClick = () => {
    if (!authStepsComponent.value)
      return emit('change-component', 'FindStructure')

    const previousPage: string | undefined = {
      AuthStart: '',
      Confirmation: '',
      Login: 'AuthStart',
      CheckEmail: 'AuthStart',
      RegisterMainForm: 'CheckEmail',
      ConfirmPhone: 'Register',
      SelectPatient: '',
      Done: '',
    }[authStepsComponent.value]

    if (typeof previousPage === 'string')
      authStepsComponent.value = previousPage
  }

  const showQuestionarireLink = ref(false)

  watch(
    () => authStepsComponent.value,
    async (newVal) => {
      showQuestionarireLink.value =
        newVal === 'Done' &&
        (await store.dispatch(
          QUESTIONNAIRE_ACTION_TYPES.CHECK_QUESTIONNAIRE_AVAILABILITY
        ))
    }
  )

  return {
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
  }
}

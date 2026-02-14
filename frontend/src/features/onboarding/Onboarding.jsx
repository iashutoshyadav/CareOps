import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useWorkspace from '../../hooks/useWorkspace';
import useAlerts from '../../hooks/useAlerts';
import api from '../../services/api';
import { useOnboarding } from '../../context/OnboardingContext';

// Steps
import WorkspaceSetup from './steps/WorkspaceSetup';
import ServicesStep from './steps/ServicesStep';
import AvailabilityStep from './steps/AvailabilityStep';
import InventorySetup from './steps/InventorySetup';
import StaffSetup from './steps/StaffSetup';
import IntegrationsStep from './steps/IntegrationsStep';
import FormSetup from './steps/FormSetup';
import ActivationReview from './steps/ActivationReview';

const STEPS = [
    { id: 'workspace', title: 'Workspace', component: WorkspaceSetup },
    { id: 'services', title: 'Services', component: ServicesStep },
    { id: 'availability', title: 'Availability', component: AvailabilityStep },
    { id: 'inventory', title: 'Inventory', component: InventorySetup },
    { id: 'staff', title: 'Staff', component: StaffSetup },
    { id: 'integrations', title: 'Integrations', component: IntegrationsStep },
    { id: 'forms', title: 'Forms', component: FormSetup },
    { id: 'review', title: 'Review', component: ActivationReview },
];

const Onboarding = () => {
    const { currentStep, setCurrentStep, formData, updateData } = useOnboarding();
    const { user, updateUser } = useAuth();
    const { setWorkspace } = useWorkspace();
    const { addNotification } = useAlerts();
    const navigate = useNavigate();

    const nextStep = async (data = {}) => {
        // Filter out MouseEvents if onNext is called directly from onClick
        const stepData = (data && (data.nativeEvent || data.target)) ? {} : data;
        const updatedData = { ...formData, ...stepData };

        if (Object.keys(stepData).length > 0) {
            updateData(stepData);
        }

        if (currentStep === 0) {
            // Create workspace after first step
            try {
                const { data: workspaceData } = await api.post('/workspace', {
                    name: updatedData.workspaceName,
                });
                setWorkspace(workspaceData.data.workspace);
                updateUser({ workspaceId: workspaceData.data.workspace.id });
                setCurrentStep(prev => prev + 1);
            } catch (error) {
                addNotification(error.response?.data?.message || 'Failed to create workspace', 'error');
            }
        } else if (currentStep < STEPS.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            handleFinalize();
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleFinalize = async () => {
        try {
            await api.post('/onboarding/activate');
            addNotification('Workspace activated successfully!', 'success');
            navigate('/dashboard');
        } catch (error) {
            addNotification(error.response?.data?.message || 'Activation failed', 'error');
        }
    };

    const CurrentComponent = STEPS[currentStep].component;
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 min-h-full flex flex-col justify-center items-center py-12">
            <div className="w-full max-w-xl space-y-8">
                <div className="text-center">
                    <span className="text-indigo-600 font-bold tracking-widest uppercase text-xs block mb-3">
                        Step {currentStep + 1} of {STEPS.length}
                    </span>
                    <h2 className="text-4xl font-black text-gray-900 tracking-tight">
                        {STEPS[currentStep].title}
                    </h2>
                </div>

                <div className="w-full">
                    <CurrentComponent
                        data={formData}
                        updateData={updateData}
                        onNext={nextStep}
                        onBack={prevStep}
                        isLastStep={currentStep === STEPS.length - 1}
                    />
                </div>
            </div>
        </div>
    );
};

export default Onboarding;

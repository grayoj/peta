import FileUpload from '../components/FileUpload';
import Navigation from '../components/Navigation';

export default function DashboardPage() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <FileUpload />
      </div>
    </>
  );
}

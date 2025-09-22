import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, MapPin, Users, AlertTriangle } from "lucide-react";

interface PatientDetail {
  age: number;
  gender: string;
  symptoms: string[];
}

interface ReportData {
  village: string;
  householdId: string;
  patientCount: number;
  patientDetails: PatientDetail[];
  symptoms: string[];
  onsetDate: string;
  severity: string;
  notes: string;
  reportDate: string;
  gps: {
    lat: number;
    lng: number;
  };
}

const Reports = () => {
  const [reports, setReports] = useState<ReportData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        
        const response = await fetch('http://13.220.174.139:5000/api/symptoms');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // If the API returns a single object, convert it to an array
        // If the API returns an array, use it directly
        if (Array.isArray(data)) {
          setReports(data);
        } else {
          // Assuming the API returns a single report object
          setReports([data]);
        }
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching reports:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'mild':
        return 'bg-green-100 text-green-800';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800';
      case 'severe':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Card className="border-red-200">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              <span>Error loading reports: {error}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Health Reports</h1>
        <p className="text-muted-foreground">
          Monitor health incidents and symptoms reported across villages
        </p>
      </div>

      <div className="grid gap-6">
        {reports.map((report, index) => (
          <Card key={index} className="w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <span>{report.village}</span>
                  </CardTitle>
                  <CardDescription>
                    Household ID: {report.householdId}
                  </CardDescription>
                </div>
                <Badge className={getSeverityColor(report.severity)}>
                  {report.severity.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">
                    {report.patientCount} patient{report.patientCount > 1 ? 's' : ''}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Onset: {report.onsetDate}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Reported: {formatDate(report.reportDate)}</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Patient Details:</h4>
                {report.patientDetails.map((patient, patientIndex) => (
                  <div key={patientIndex} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">
                        Patient {patientIndex + 1}: {patient.age} years old, {patient.gender}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {patient.symptoms.map((symptom, symptomIndex) => (
                        <Badge key={symptomIndex} variant="secondary" className="text-xs">
                          {symptom}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {report.notes && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Notes:</h4>
                    <p className="text-sm text-gray-600">{report.notes}</p>
                  </div>
                </>
              )}

              {report.gps.lat !== 0 && report.gps.lng !== 0 && (
                <>
                  <Separator />
                  <div className="text-xs text-gray-500">
                    GPS: {report.gps.lat.toFixed(4)}, {report.gps.lng.toFixed(4)}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {reports.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-gray-500">
              No reports available at the moment.
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Reports;
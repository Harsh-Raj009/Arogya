"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus, ArrowLeft, Check, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { DateInput } from "@/components/ui/date-input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast";

export default function NewPatientPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "Male",
    bloodGroup: "B+",
    contactPhone: "",
    emergencyContact: "",
    abhaId: "",
    address: "",
    knownAllergies: "",
    chronicConditions: "",
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.contactPhone.trim()) newErrors.contactPhone = "Contact phone is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate clinical record creation
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        type: "success",
        title: "Patient Enrolled Successfully",
        message: `${formData.firstName} ${formData.lastName} enrolled under UHID-2026-${Math.floor(1000 + Math.random() * 9000)}.`,
      });
      router.push("/patients");
    }, 700);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Register New Patient"
        eyebrow="Patient Intake Registry"
        description="Enroll patient into the longitudinal clinical registry. Demographic and allergy data will sync across all future clinical encounters."
        breadcrumbs={[
          { label: "Patients", href: "/patients" },
          { label: "New Patient Registration", current: true },
        ]}
        actions={
          <Link href="/patients">
            <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="h-3.5 w-3.5" />}>
              Back to Registry
            </Button>
          </Link>
        }
      />

      <form onSubmit={handleSubmit}>
        <Card className="shadow-[0_1px_3px_rgba(15,23,42,0.03)] border-slate-200/90">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <CardTitle>Demographic & Identification Details</CardTitle>
                <p className="text-xs text-slate-500 mt-0.5">
                  Fields marked with an asterisk (*) are mandatory for clinical identification.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-teal-800 font-medium bg-teal-50 border border-teal-200/80 px-2 py-0.5 rounded">
                <ShieldCheck className="h-3.5 w-3.5 text-teal-700" />
                <span>Interoperability-Ready Architecture</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-5 pt-2">
            {/* Row 1: Names */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="First Name *"
                placeholder="e.g. Rajesh"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                error={errors.firstName}
              />
              <Input
                label="Last Name *"
                placeholder="e.g. Gupta"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                error={errors.lastName}
              />
            </div>

            {/* Row 2: DOB, Gender, Blood Group */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <DateInput
                label="Date of Birth *"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                error={errors.dateOfBirth}
              />
              <Select
                label="Gender *"
                options={[
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                  { value: "Other", label: "Other" },
                ]}
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              />
              <Select
                label="Blood Group"
                options={[
                  { value: "A+", label: "A positive (A+)" },
                  { value: "A-", label: "A negative (A-)" },
                  { value: "B+", label: "B positive (B+)" },
                  { value: "B-", label: "B negative (B-)" },
                  { value: "AB+", label: "AB positive (AB+)" },
                  { value: "AB-", label: "AB negative (AB-)" },
                  { value: "O+", label: "O positive (O+)" },
                  { value: "O-", label: "O negative (O-)" },
                ]}
                value={formData.bloodGroup}
                onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
              />
            </div>

            {/* Row 3: Phone & Emergency Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Contact Phone *"
                placeholder="e.g. +91 98101 23456"
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                error={errors.contactPhone}
              />
              <Input
                label="Emergency Contact (Name & Phone)"
                placeholder="e.g. Sunita Gupta (+91 98101 98765)"
                value={formData.emergencyContact}
                onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
              />
            </div>

            {/* Row 4: ABHA ID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Ayushman Bharat Health Account (ABHA ID)"
                placeholder="e.g. 91-4821-3920-1102"
                value={formData.abhaId}
                onChange={(e) => setFormData({ ...formData, abhaId: e.target.value })}
                helperText="National 14-digit identifier for longitudinal record linkage (optional)."
              />
              <Input
                label="Residential Address"
                placeholder="e.g. Sector 12, R.K. Puram, New Delhi"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            {/* Row 5: Allergies & Chronic Conditions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <Textarea
                label="Known Drug / Environmental Allergies"
                placeholder="e.g. Penicillin (causes facial hives), Aspirin..."
                value={formData.knownAllergies}
                onChange={(e) => setFormData({ ...formData, knownAllergies: e.target.value })}
                helperText="Critical warnings will be highlighted in all subsequent encounters."
                rows={3}
              />
              <Textarea
                label="Known Chronic Medical Conditions"
                placeholder="e.g. Type 2 Diabetes (5 years), Hypertension..."
                value={formData.chronicConditions}
                onChange={(e) => setFormData({ ...formData, chronicConditions: e.target.value })}
                helperText="Pre-existing baseline conditions for clinician context."
                rows={3}
              />
            </div>
          </CardContent>

          <CardFooter className="justify-end gap-2.5 p-4 border-t border-slate-100 bg-slate-50/40">
            <Link href="/patients">
              <Button variant="outline" size="md" disabled={isSubmitting}>
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isSubmitting}
              leftIcon={<Check className="h-4 w-4" />}
            >
              Complete Registration
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

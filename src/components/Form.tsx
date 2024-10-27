'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { hostelQuestions as questions } from '@/constants/hostelQuestion'
import Rating from './rating/rating'
import { hostelNames } from '@/constants/hostelQuestion'
import axios from 'axios'
import { emailRegex } from '@/constants/hostelQuestion'
import { baseURL } from '@/constants'
import { Textarea } from './ui/textarea'
import { AgreementModal } from './ui/modal'

export default function Form() {
    const [ratings, setRatings] = useState(questions.map(() => 0))
    const [selectedHostel, setSelectedHostel] = useState("")
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [remark, setRemark] = useState("")
    const [showAgreement,setShowAgreement]=useState(false)

    const handleRatingChange = (index: number, value: number) => {
        const newRatings = [...ratings]
        newRatings[index] = value
        setRatings(newRatings)
    }

    const handleSubmit = async () => {
        if (selectedHostel === "" || email === "") {
            alert("Please select a hostel and enter email");
            return
        }
        if (!(emailRegex.test(email))) {
            alert("Please enter a valid email");
            return
        }
        setLoading(true)
        try {

            const res = await axios.post(`${baseURL}/api/feedback/add`, {

                name: selectedHostel,
                email: email,
                hygiene: ratings[0],
                foodQuality: ratings[1],
                foodQuantity: ratings[2],
                foodTiming: ratings[3],
                menuAdherence: ratings[4],
                staffHygiene: ratings[5],
                tableCleanliness: ratings[6],
                staffBehavior: ratings[7],
                plateCleanliness: ratings[8],
                waitingTime: ratings[9],
                remark: remark
            })
            console.log(res.headers)
            alert("Form submitted successfully")
            console.log(response.data.message);
        } catch (error) {
            alert("Form not submitted")
           
            
        } finally {
            setLoading(false)
        }
    }

    const ToggleAgreement=()=>{
        setShowAgreement(!showAgreement)
    }

    return (
        <Card className="w-full max-w-3xl mx-auto p-6">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center mb-4">Mess Feedback Form</CardTitle>
            </CardHeader>

            {/* Form to take hostel name and email */}
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    {/* Dropdown for hostel names */}
                    <div className="space-y-2">
                        <Label className="text-base font-medium">Hostel Name</Label>
                        <select
                            className="w-full p-2 border rounded-md"
                            onChange={(e) => setSelectedHostel(e.target.value)}
                        >
                            <option value="">Select a hostel</option>
                            {hostelNames.map((hostel, index) => (
                                <option key={index} value={hostel}>
                                    {hostel}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Input for email */}
                    <div className="space-y-2">
                        <Label className="text-base font-medium">Email</Label>
                        <input
                            type="email"
                            className="w-full p-2 border rounded-md"
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
            </CardContent>

            {/* Feedback form for questions */}
            <CardContent className="space-y-6 mt-4">
                {questions.map((question, index) => (
                    <div key={index} className="space-y-2">
                        <Label className="text-base font-medium">
                            {index + 1}. {question}
                        </Label>
                        <div className="flex items-center space-x-4">
                            <div className="slider-wrapper">
                                <Rating
                                    key={index}
                                    onChange={(value) => handleRatingChange(index, value)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
                <div className="space-y-2">
                    <div className="flex items-start  flex-col space-x-4">
                        <Label className="text-base font-medium">
                            11. Remarks (in 10 words)
                        </Label>
                        <div className="slider-wrapper">
                            <Textarea placeholder="Any remarks regarding clealiness of mess" id="message" value={remark} onChange={(e) => setRemark(e.target.value)} />
                        </div>
                    </div>
                </div>
            </CardContent>


            {/* Submit button */}
            <CardFooter className="pt-6 flex flex-col space-y-4">
                <Button className="w-full py-3" onClick={handleSubmit}>
                    {!loading ? "Submit Feedback" : "Submitting..."}
                </Button>
                <Button className="w-full py-3" onClick={ToggleAgreement}>
                    Show Contract
                </Button>
            </CardFooter>
            <AgreementModal isOpen={showAgreement} ToggleAgreement={ToggleAgreement} />
        </Card>

    )
}

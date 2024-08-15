import * as aws from "@pulumi/aws"
import * as pulumi from "@pulumi/pulumi"

const config = new pulumi.Config()

const buildSecurityGroup = new aws.ec2.SecurityGroup('build-sg', {
  description: 'Test SG',
  vpcId: config.require('vpcId')
})

new aws.vpc.SecurityGroupEgressRule('build-sg-egress', {
  description: 'Allow all outbound traffic',
  securityGroupId: buildSecurityGroup.id,
  cidrIpv4: '0.0.0.0/0',
  ipProtocol: '-1'
}, { parent: buildSecurityGroup })
